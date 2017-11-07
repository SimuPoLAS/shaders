const int n = 100;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 complex_mult(vec2 a, vec2 b) {
	return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

vec3 getcolor(float i) {
	return vec3(mod(i, 10.0) / 10.0,mod(i, 100.0) / 100.0,mod(i, 1000.0) / 1000.0);
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	vec2 c = (uv - vec2(0.5)) * 5.0 + ((u_mouse-u_resolution) / (u_resolution*0.5));
	vec3 color = vec3(0.0);

	vec2 z = vec2(0.0);
	for (int i = 0; i < n; i++) {
		z = complex_mult(z, z) + c;

		if (length(z) > 2.0) {
			color = getcolor(float(i));
			break;
		}
	}

	gl_FragColor = vec4(color, 1.0);
}

