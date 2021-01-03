QUnit.test( "Tizen Test 1", function( assert ) {
	assert.ok( 1 === "1", "1 is 1" );
});

QUnit.test( "Tizen Test 2", function( assert ) {
	assert.equal( 0, 0, "0 is 0" );
	assert.notEqual( 2, 1, "2 is not 1" );
});

