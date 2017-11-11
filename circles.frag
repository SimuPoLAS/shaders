
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float _angle) {
	return mat2(
		cos(_angle), -sin(_angle),
		sin(_angle), cos(_angle)
	);
}

void main() {
	float side = min(u_resolution.x, u_resolution.y);
	float factor = 10.0;
	vec3 color = vec3(0.0);
	vec2 uv = (gl_FragCoord.xy - u_resolution / 2.0) / side;
	vec2 m = (u_mouse.xy - u_resolution / 2.0) / side;
	
	uv *= factor;
	uv = rotate2d(-atan(m.x, m.y)) * uv;
	//uv.x += cos(u_time);
	//uv.y += sin(u_time);
	//float theta = u_time;
	//uv.x = uv.x * cos(theta) - uv.y * sin(theta);
	//uv.y = uv.x * sin(theta) + uv.y * cos(theta);
	
	vec2 ruv = vec2(round(uv.x), round(uv.y)) - uv;

	//float e = mod(uv.x*uv.x, 1.0) + mod(uv.y*uv.y, 1.0); 
	float e = ruv.x*ruv.x + ruv.y*ruv.y;
	if (e < 0.01 + sin(u_time) * sin(u_time) * 0.35)
		color = vec3(sin(u_time), cos(u_time), 1.0);

	gl_FragColor = vec4(color, 1.0);
}
