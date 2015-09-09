
var expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest.agent("https://userlocation.herokuapp.com") //change the host
    faker = require('faker');

    var lat, lon, email, newEmail;
    email = faker.internet.email();
    newEmail = faker.internet.email();

    // ********************************************************
    // STEP 1:  Making an API request without ltd.
    // expected result 400 bad request
    // status fail
    // ********************************************************
    it("STEP 1: Making an API request without ltd parameter", function (done) {
        this.timeout(15000);
        lon = faker.address.longitude();
        api.get('/locations?lng='+lon+'&email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(400);
                done();
            });
    });

    // ********************************************************
    // STEP 1.2: Check if any history recorded against email used above
    // expected result 404 bad request
    // status fail
    // ********************************************************
    it("STEP 1.2: Check if any history recorded against email "+email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(404);
                done();
            });
    });

    // ********************************************************
    // STEP 2:  Making an API request without lng.
    // expected result 400 bad request
    // status fail
    // ********************************************************
    it("STEP 2: Making an API request without ltd parameter", function (done) {
        this.timeout(15000);
        lat = faker.address.latitude();
        api.get('/locations?ltd='+lat+'&email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(400);
                done();
            });
    });

    // ********************************************************
    // STEP 2.2: Check if any history recorded against email used above
    // expected result 404 bad request
    // status fail
    // ********************************************************
    it("STEP 2.2: Check if any history recorded against email "+ email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(404);
                done();
            });
    });

    // ********************************************************
    // STEP 3:  Making an API request without email.
    // expected result 400 bad request
    // status fail
    // ********************************************************
    it("STEP 3: Making an API request without ltd parameter", function (done) {
        this.timeout(15000);
        lon = faker.address.longitude();
        lat = faker.address.latitude();
        api.get('/locations?lng='+lon+'&ltd='+lat)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(400);
                done();
            });
    });

    // ********************************************************
    // STEP 3.2: Check if any history recorded against email used above
    // expected result 404 bad request
    // status fail
    // ********************************************************
    it("STEP 3.2: Check if any history recorded against email "+email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(404);
                done();
            });
    });

    // ********************************************************
    // STEP 4:  Making a valid API request.
    // expected result 200 status
    // status pass
    // ********************************************************
    it("STEP 4: Making an API request for email "+email, function (done) {
        this.timeout(15000);
        lon = faker.address.longitude();
        lat = faker.address.latitude();
        api.get('/locations?lng='+lon+'&ltd='+lat+'&email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    // ********************************************************
    // STEP 4.2: Check if any history recorded against email used above
    // expected result 200 status with valid results
    // status pass
    // ********************************************************
    it("STEP 4.2: Check if any history recorded against email "+email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).to.be.equal(1);
                done();
            });
    });

    // ********************************************************
    // STEP 5: Making another valid API request.
    // expected result 200 status
    // status pass
    // ********************************************************
    it("STEP 5: Making an API request for email "+email, function (done) {
        this.timeout(15000);
        lon = faker.address.longitude();
        lat = faker.address.latitude();
        api.get('/locations?lng='+lon+'&ltd='+lat+'&email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    // ********************************************************
    // STEP 5.2: Check if any increase in history recorded against email used above
    // expected result 200 status with valid results > 1
    // status pass
    // ********************************************************
    it("STEP 5.2: Check if any history recorded against email "+email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).to.be.above(1);
                done();
            });
    });

    // ********************************************************
    // STEP 6: Making another valid API request.
    // expected result 200 status
    // status pass
    // ********************************************************
    it("STEP 6: Making an API request for email "+email, function (done) {
        this.timeout(15000);
        lon = faker.address.longitude();
        lat = faker.address.latitude();
        api.get('/locations?lng='+lon+'&ltd='+lat+'&email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    // ********************************************************
    // STEP 6.2: Check if any increase in history recorded against email used above
    // expected result 200 status with valid results > 2
    // status pass
    // ********************************************************
    it("STEP 6.2: Check if any history recorded against email "+email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).to.be.above(2);
                done();
            });
    });


    // ********************************************************
    // STEP 7: Making another valid API request against new email.
    // expected result 200 status
    // status pass
    // ********************************************************
    it("STEP 7: Making another valid API request against new email "+newEmail, function (done) {
        this.timeout(15000);
        lon = faker.address.longitude();
        lat = faker.address.latitude();
        api.get('/locations?lng='+lon+'&ltd='+lat+'&email='+newEmail)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    // ********************************************************
    // STEP 7.2: Check if any increase in history recorded against old email
    // expected result 200 status with valid results = 3
    // status pass
    // ********************************************************
    it("STEP 7.2: Check if any history recorded against email "+email, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+email)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).to.be.equal(3);
                done();
            });
    });

    // ********************************************************
    // STEP 7.3: Check if any increase in history recorded against new email
    // expected result 200 status with valid results = 1
    // status pass
    // ********************************************************
    it("STEP 7.3: Check if any history recorded against new email "+ newEmail, function (done) {
        this.timeout(15000);
        api.get('/locations/history?email='+newEmail)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).to.be.equal(1);
                done();
            });
    });