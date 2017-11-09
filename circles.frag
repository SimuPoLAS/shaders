
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	float side = min(u_resolution.x, u_resolution.y);
	float factor = 5.0;
	vec2 uv = (gl_FragCoord.xy - u_resolution / 2.0) / side;

	
	
	gl_FragColor = vec4(uv.x*uv.x + uv.y*uv.y);
}
