#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// define colors for live and dead cells
vec4 live = vec4(1.0);
vec4 dead = vec4(0.0);

void main() {
    // calculate position
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    // calculate aspect ratio
    vec2 ar = u_resolution / min(u_resolution.x, u_resolution.y);

    // initial color is DED
    vec4 color = dead;

    float dist = distance(u_mouse, pos);

    gl_FragColor = color + dist;
}
