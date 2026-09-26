export const orbVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uShape;       // 0..1 - morphing entre formas
  uniform float uNoiseScale;  // escala del ruido
  varying float vDisp;
  varying vec3 vNormal;
  varying vec3 vPosition;

  vec3 hash3(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(dot(hash3(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
            dot(hash3(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
        mix(dot(hash3(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
            dot(hash3(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x),
        u.y
      ),
      mix(
        mix(dot(hash3(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
            dot(hash3(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
        mix(dot(hash3(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
            dot(hash3(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x),
        u.y
      ),
      u.z
    );
  }

  void main() {
    vNormal = normal;
    vPosition = position;

    // ─── Multi-octava noise para morphing ───
    // Capa 1: forma base (baja frecuencia)
    float n1 = noise(position * uNoiseScale + uTime * 0.35);

    // Capa 2: detalle (alta frecuencia) — más visible con uShape alto
    float n2 = noise(position * (uNoiseScale * 2.4) + uTime * 0.6);

    // Capa 3: ripple sutil (frecuencia media)
    float n3 = sin(position.x * 3.0 + uTime * 0.8) *
               cos(position.y * 3.0 + uTime * 0.6) *
               sin(position.z * 3.0 + uTime * 0.4);

    // Combinar según el morphing
    float baseNoise = n1;
    float detail = mix(0.0, n2 * 0.4, uShape);
    float ripple = mix(0.0, n3 * 0.08, 1.0 - uShape);

    float totalNoise = baseNoise + detail + ripple;

    // Displacement
    float disp = totalNoise * uEnergy;
    vDisp = disp;

    vec3 newPos = position + normal * disp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

export const orbFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uShape;
  varying float vDisp;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Glow basado en el displacement
    float glow = smoothstep(-0.4, 0.6, vDisp) * 0.5 + 0.5;

    // Fresnel (rim light)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);

    // Rim más intenso cuando uShape es bajo (más esférico)
    float rimIntensity = mix(0.6, 0.9, 1.0 - uShape);

    vec3 col = uColor * glow;
    col += uColor * fresnel * rimIntensity;

    // Brillo en la zona caliente
    col += vec3(1.0, 0.9, 0.7) * pow(fresnel, 4.0) * 0.4;

    gl_FragColor = vec4(col, 1.0);
  }
`;
