#ifdef GL_ES
precision mediump float;
#endif

//#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main()
{
    
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    
    vec3 destColor = vec3(0.0);

    //destColor.x += abs(sin(u_time) * 1.75);
    destColor.y = 0.1;
    destColor.z = 0.1;
    destColor.y += abs(sin(u_time) * 0.1);
    destColor.z += abs(sin(u_time) * 0.2);
    
    
    for(float i = 0.0; i < 15.0; i++)
    {
        float j = i + 1.;
        vec2 q = p + vec2(cos(u_time * j), sin(u_time * j)) * sin(u_time) * i / 12.;
        
        destColor += 0.025 / length(q);
    }


    gl_FragColor = vec4(destColor, 1.0);
}
