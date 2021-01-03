var g_nCurrentRotation = 360;
var g_nRotationAngle = 1.0;
var global = {};
var g_nRequestId = 0;

function setupColors(webGL)
{
	var colors = new Uint8Array(
        [  0, 1, 0, 1,   0, 1, 0, 1,   0, 1, 0, 1,   0, 1, 0, 1,	//main - green
		   0, 0, 1, 1,   0, 0, 1, 1,   0, 0, 1, 1,   0, 0, 1, 1,	// right - blue
           1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,	//top - red
           1, 1, 0, 1,   1, 1, 0, 1,   1, 1, 0, 1,   1, 1, 0, 1,	//left - yellow
           0, 0, 0, 1,   0, 0, 0, 1,   0, 0, 0, 1,   0, 0, 0, 1,	// bottom - black
           0, 0, 0, 1,   0, 0, 0, 1,   0, 0, 0, 1,   0, 0, 0, 1 ]	// back - black
                                            );
    // Set up the vertex buffer for the colors
    global.box.colorObject = webGL.createBuffer();
    webGL.bindBuffer(webGL.ARRAY_BUFFER, global.box.colorObject);
    webGL.bufferData(webGL.ARRAY_BUFFER, colors, webGL.STATIC_DRAW);
}
   
function init()
{
    var canvas = document.getElementById('screen');
    var webGL = WebGLUtils.setupWebGL(canvas);
    if (!webGL) {
      return;
    }
    global.program = simpleSetup(
        webGL, "vshader", "fshader",
        [ "vNormal", "vColor", "vPosition"], [ 1, 1, 1, 1 ], 10000);

    // Set up a uniform variable for the shaders
    webGL.uniform3f(webGL.getUniformLocation(global.program, "lightDir"), 0, 0, 1);

    global.box = makeBox(webGL);
    
    setupColors(webGL);
    
    global.mvMatrix = new J3DIMatrix4();
    global.u_normalMatrixLoc = webGL.getUniformLocation(global.program, "u_normalMatrix");
    global.normalMatrix = new J3DIMatrix4();
    global.u_modelViewProjMatrixLoc =
            webGL.getUniformLocation(global.program, "u_modelViewProjMatrix");
    global.mvpMatrix = new J3DIMatrix4();

    webGL.enableVertexAttribArray(0);
    webGL.enableVertexAttribArray(1);
    webGL.enableVertexAttribArray(2);

    webGL.bindBuffer(webGL.ARRAY_BUFFER, global.box.vertexObject);
    webGL.vertexAttribPointer(2, 3, webGL.FLOAT, false, 0, 0);

    webGL.bindBuffer(webGL.ARRAY_BUFFER, global.box.normalObject);
    webGL.vertexAttribPointer(0, 3, webGL.FLOAT, false, 0, 0);

    webGL.bindBuffer(webGL.ARRAY_BUFFER, global.box.colorObject);
    webGL.vertexAttribPointer(1, 4, webGL.UNSIGNED_BYTE, false, 0, 0);

    webGL.bindBuffer(webGL.ELEMENT_ARRAY_BUFFER, global.box.indexObject);

    return webGL;
}

function setupView(webGL)
{
    var canvas = document.getElementById('screen');
    webGL.viewport(0, 0, canvas.width, canvas.height);
    global.perspectiveMatrix = new J3DIMatrix4();
    global.perspectiveMatrix.perspective(30, 1, 1, 10000);
    global.perspectiveMatrix.lookat(0, 0, 7, 0, 0, 0, 0, 1, 0);
}

function draw(webGL)
{
    setupView(webGL);
    webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);

    global.mvMatrix.makeIdentity();
    global.mvMatrix.rotate(20, 1,0,0);
    global.mvMatrix.rotate(g_nCurrentRotation, 0,1,0);

    global.normalMatrix.load(global.mvMatrix);
    global.normalMatrix.invert();
    global.normalMatrix.transpose();
    global.normalMatrix.setUniform(webGL, global.u_normalMatrixLoc, false);

    global.mvpMatrix.load(global.perspectiveMatrix);
    global.mvpMatrix.multiply(global.mvMatrix);
    global.mvpMatrix.setUniform(webGL, global.u_modelViewProjMatrixLoc, false);

    webGL.drawElements(webGL.TRIANGLES, global.box.numIndices, webGL.UNSIGNED_BYTE, 0);

    //Enable clockwise rotation
    g_nCurrentRotation -= g_nRotationAngle;
    if (0 > g_nCurrentRotation) {
        g_nCurrentRotation = 360;
    }
}

function pause(event) {
	event.preventDefault();
    if (undefined !== g_nRequestId) {
        window.cancelAnimFrame(g_nRequestId);
        g_nRequestId = undefined;
    }
}

function resume() {
    init();
    animate();
}

function run() {
    var canvas = document.getElementById('screen');
    canvas.addEventListener('webglcontextlost', pause, false);
    canvas.addEventListener('webglcontextrestored', resume, false);

    var webGL = init();
    if (!webGL) {
      return;
    }
    
    var animate = function() {
        draw(webGL);
        g_nRequestId = window.requestAnimFrame(animate, canvas);
    };
    animate();
}