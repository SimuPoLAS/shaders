// Author: satorialist
// Title: flashlight

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    // pixel position as a decimal (position would be anything from 0, 0 to 1920, 1080 in our case)
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));
    
    vec3 light_position = vec3(u_mouse.xy, 0.5);

	// distance determines wether our current pixel is affected by light affects
	float dist = distance(gl_FragCoord.xy, light_position.xy);
    
    vec4 gradient = vec4(color,1.0);
    
	gl_FragColor = gradient * (1.0 - (dist / (light_position.z * u_resolution.x)));
}