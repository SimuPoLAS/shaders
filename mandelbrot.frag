const int n = 120;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 complex_mult(vec2 a, vec2 b) {
	return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

vec3 getcolor(float i) {
	return vec3(mod(i, 5.0) / 5.0,mod(i, 10.0) / 10.0,mod(i, 15.0) / 15.0);
}

void main() {
	float side = min(u_resolution.x, u_resolution.y);
	float zoom = (3.0 * sin(u_time / 10.0) * sin(u_time / 10.0) + 0.001);
	vec2 ratio = side / u_resolution.xy - vec2(1.0, 1.0);
	vec2 p = vec2(0.51, 0.522);

	vec2 uv = (gl_FragCoord.xy - u_resolution / 2.0) / side;
	vec2 c = uv * zoom - p;
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

