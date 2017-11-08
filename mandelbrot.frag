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
	float side = min(u_resolution.x, u_resolution.y);
	float zoom = (3.0 * sin(u_time / 10.0) * sin(u_time / 10.0) + 0.001);
	vec2 ratio = side / u_resolution.xy - vec2(1.0, 1.0);
	vec2 p = vec2(1.5, 0.0) * zoom;

	vec2 uv = gl_FragCoord.xy / side;
	vec2 c = (uv - vec2(0.5) + ratio) * zoom - p;
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

