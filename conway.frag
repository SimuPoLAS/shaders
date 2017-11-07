#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D backbuffer;

vec4 live = vec4(1.0);
vec4 dead = vec4(0.0);

void main() {
    vec2 pos = (gl_FragCoord.xy / u_resolution.xy);
    vec2 pixelsize = 1.0 / u_resolution.xy;

    // define starting color
    vec4 color = dead;

    float sum = 0.0;
    // check neighbours
    // 6-7-8
    // 4-x-5
    // 1-2-3
    sum += texture2D(backbuffer, pos + vec2(-1.0, -1.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(-1.0, 0.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(-1.0, 1.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(1.0, -1.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(1.0, 0.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(1.0, 1.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(0.0, -1.0) * pixelsize).r;
    sum += texture2D(backbuffer, pos + vec2(0.0, 1.0) * pixelsize).r;

    // get the currently targeted pixel, the "x" in our small diagram
    vec4 self = texture2D(backbuffer, pos);
    // if self was not alive previously
    if (self.r < 0.1) {
        // resurrection
        if (sum > 2.9 && sum < 3.1) {
            color = live;
        }
    } else {
        // death by solitude
        if (sum < 1.1) {
            color = dead;
        // death by overpopulation
        } else if (sum > 3.9) {
            color = dead;
        // two or three neighbours, live!
        } else {
            color = live;
        }
    }

    // distance determines wether our current pixel is affected by mouse_pos
    float dist = distance(gl_FragCoord.xy, u_mouse.xy);
    // if current pixel is directly under the cursor
    if (dist <= 4.0) {
        color = live;
    }

    gl_FragColor = color;
}