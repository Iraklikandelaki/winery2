let object2, frameArea, floor, light, mouseMesh, root, bottle2;
let INTERSECTED, INTERSECTED2, mouse, cube;
let views = [];
// var mouse = {
// 	x: 0,
// 	y: 0
//   };
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 27, document.querySelector(".canvas1-parent").clientWidth/document.querySelector(".canvas1-parent").clientHeight, 1, 5000 );
var drawingSurface = document.getElementById( 'canvas' );
scene.background = new THREE.Color( 0x000000 );
// scene.fog = new THREE.Fog(0x000000, 1, 2);
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: drawingSurface});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( 1920, 973 )

// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );




 raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();


document.addEventListener( 'mousemove', onMouseMove );




const sphere = new THREE.SphereGeometry( 10, 10, 10 );
const boxgeometry = new THREE.BoxGeometry( 5, 5, 5 );
const boxmaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );


// cube = new THREE.PointLight(0xe8effa, 2, 900);
// cube.castShadow = true;
//   cube.position.set(0, 0, 0);
//   scene.add(cube);


light = new THREE.PointLight(0xe8effa, 2, 900);
light.castShadow = true;
light.position.set(300, 190, 600);

// const sphereSize = 10;
// const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
// scene.add( pointLightHelper );


light.shadow.mapSize.width = 912; // default
light.shadow.mapSize.height = 912; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 700; // default
  scene.add(light);






const boxgeometry2 = new THREE.BoxGeometry( 5, 5, 5 );
const boxmaterial2 = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
const cube2 = new THREE.Mesh( boxgeometry2, boxmaterial2 );
cube2.position.set(0, -33, 37)
scene.add( cube2 );



// const ambLight = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( ambLight );




    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('./bottle2/scene.gltf', (gltf) => {
      root = gltf.scene;
	//   root.scale.set(2, 2, 2) // scale here
	  root.position.set(550, -60, 400)
	  root.traverse(function(node) {
		if (node instanceof THREE.Mesh) {
		  node.castShadow = true;
		}
	  });
      scene.add(root);
	  
	//   var axesHelper = new THREE.AxesHelper( 100 );
	//   scene.add( axesHelper );


      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
    //   frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
	// root.scale.set(1000, 1000, 1000) // scale here
      // update the Trackball controls to handle the new size
    //   controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
	//   controls.enableDamping = true;
	//   controls.minPolarAngle = 0; // radians
	// 	controls.maxPolarAngle = Math.PI / 2; // radians
	//   controls.dampingFactor = 0.6;
    //   controls.update();
    });

	let texture = THREE.ImageUtils.loadTexture( "./wood.jpg" );

	const floorgeometry = new THREE.PlaneGeometry( 1015, 1420, 632 );
	const floormaterial = new THREE.MeshPhongMaterial( { map : texture, side: THREE.DoubleSide} );
	const floorplane = new THREE.Mesh( floorgeometry, floormaterial );
	floorplane.position.set(300,-250,400)
	floorplane.rotation.x = Math.PI / 2; 
	floorplane.receiveShadow = true;
	
	scene.add( floorplane );




	gltfLoader.load('./bottle2/scene.gltf', (gltf) => {
		bottle2 = gltf.scene;

		bottle2.position.set(300, -60, 400)
		
		scene.add(bottle2);
		
  
		const box = new THREE.Box3().setFromObject(bottle2);
  
		const boxSize = box.getSize(new THREE.Vector3()).length();
		const boxCenter = box.getCenter(new THREE.Vector3());
		// bottle2.scale.set(100, 100, 100) // scale here
		// set the camera to frame the box
	  //   frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
  
		// update the Trackball controls to handle the new size

		gltf.scene.traverse(function(node) {
			if (node instanceof THREE.Mesh) {
			  node.castShadow = true;
			}
		  });

		controls.maxDistance = boxSize * 10;
		controls.target.copy(boxCenter);
		controls.enableDamping = true;
		controls.minPolarAngle = (Math.PI / 2) - 0.3; // radians
		  controls.maxPolarAngle = (Math.PI / 2) - 0.3; // radians
		controls.dampingFactor = 0.6;
		controls.update();
	  });

	
  

 
// 	const listener = new THREE.AudioListener();
// 	camera.add( listener );
	
// 	// create a global audio source
// 	const sound = new THREE.Audio( listener );
	
// 	// load a sound and set it as the Audio object's buffer
// 	const audioLoader = new THREE.AudioLoader();
// 	audioLoader.load( './sonata.mp3', function( buffer ) {
// 		sound.setBuffer( buffer );
// 		sound.setLoop( true );
// 		sound.setVolume( 0.5 );
// 		sound.play();
// 	});



function onMouseMove( event ) {

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

	// See if the ray from the camera into the world hits one of our meshes
	const intersects = raycaster.intersectObjects( scene.children, true );

	// es sinatles amatebs
	// if ( intersects.length > 0 ) {

	// 	cube.position.set( 0, 0, 0 );
	// 	cube.lookAt( intersects[ 0 ].face.normal );

	// 	cube.position.copy( intersects[ 0 ].point );

		

	

	// }

}


	// function onDocumentMouseMove( event ) {

	// 	event.preventDefault();

	// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	// }

	


	
	

const controls = new THREE.OrbitControls( camera, renderer.domElement );

// camera.position.set( -1400, 790, 1240 );
camera.position.set( -1400, 790, 1240 );
camera.updateMatrixWorld();
controls.enablePan = false;
controls.enableZoom = false;
// controls.update();
// document.addEventListener('mousemove', light_update );



var target = new THREE.Vector3();

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;



function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}


document.addEventListener( 'mousemove', onDocumentMouseMove );



var animate = function () {
	requestAnimationFrame( animate );

	

	
	// if (root) root.rotation.y += 0.02;
 if (root)root.rotation.y += 0.003;
 if (bottle2)bottle2.rotation.y += 0.003;
 
	// root.position.x = radius * Math.cos( angle );  
	// root.position.z = radius * Math.sin( angle );
	// angle += 0.1;
	

	controls.update();

	
  // Create a circle around the mouse and move it
  // The sphere has opacity 0
 


	renderer.render(scene, camera);
};



  // When the mouse moves, call the given function




animate();
