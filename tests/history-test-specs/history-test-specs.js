
var expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest.agent("http://localhost:8080") //change the host,
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
        api.get('/locations/history?email='+newEmail)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).to.be.equal(1);
                done();
            });
    });
    //// ********************************************************
    //// STEP 1.1:  Get agency Stops Version information
    //// ********************************************************
    //it("STEP 1.1: Get agency Stops Version information", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            oldStopVersion = res.body.counters.stopsVersion;
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.1:  Create stops with invalid stopName. stopName can only be 16 characters long
    //// expected result: fail
    //// ********************************************************
    //
    //it("STEP 2.1:  Create stops with invalid stopName -> Expect to fail, stopName can be 16 chars long", function (done) {
    //    oldStopNumber = stopNumber;
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "Hello World. How are you? I am good",
    //            stopNumber: stopNumber,
    //            latitude: customer.latitude,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //
    //// ********************************************************
    //// STEP 2.1.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 2.1.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.1.2: Trying to retrieve stopNumber created above
    //// to confirm stop is not created with that stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.1.2: Trying to retrieve stopNumber created above, expected 404", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(404);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.2:  Create stops with invalid stopNumber, stopNumber can not be less than 1
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.2:  Create stops with invalid stopNumber -> Expect to fail, stopNumber less than 1", function (done) {
    //    oldStopNumber = stopNumber;
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "transitfare",
    //            stopNumber: -1,
    //            latitude: customer.latitude,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.2.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 2.2.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.2.2: Trying to retrieve stopNumber created above
    //// to confirm stop is not created with that stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.2.2: Trying to retrieve stopNumber created above, expected 404", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(404);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.3:  Create stops with invalid latitude
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.3:  Create stops with invalid latitude", function (done) {
    //    oldStopNumber = stopNumber;
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "transitfare",
    //            stopNumber: stopNumber,
    //            latitude: 91.000001,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.3.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 2.3.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.3.2: Trying to retrieve stopNumber created above
    //// to confirm stop is not created with that stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.3.2: Trying to retrieve stopNumber created above, expected 404", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(404);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.4:  Create stops with invalid longitude
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.4:  Create stops with invalid longitude", function (done) {
    //    oldStopNumber = stopNumber;
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "transitfare",
    //            stopNumber: stopNumber,
    //            latitude: customer.latitude,
    //            longitude: 192.111122
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.4.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 2.4.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.4.2: Trying to retrieve stopNumber created above
    //// to confirm stop is not created with that stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.4.2: Trying to retrieve stopNumber created above, expected 404", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(404);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.5:  Create stops with invalid data
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.5:  Create stops with invalid data", function (done) {
    //    oldStopNumber = stopNumber;
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "transitfare systems test cripts for stops",
    //            stopNumber: -1,
    //            latitude: -100.111,
    //            longitude: 192.111122
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.5.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 2.5.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 2.5.2: Trying to retrieve stopNumber created above
    //// to confirm stop is not created with that stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 2.5.2: Trying to retrieve stopNumber created above, expected 404", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(404);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 3:  Create stops with valid data
    //// expected result: pass
    //// ********************************************************
    //it("STEP 3:  Create stops with valid data", function (done) {
    //    oldStopNumber = stopNumber;
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "transitfare",
    //            stopNumber: stopNumber,
    //            latitude: customer.latitude,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 3.0.1:  Agency StopVersion should increment
    //// ********************************************************
    //it("STEP 3.0.1: Check agency StopVersion is incremented", function (done) {
    //    oldStopVersion++;
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 3.1: Trying to retrieve stopNumber created above
    //// to confirm stop is created with that stopNumber
    //// expected result: pass
    //// ********************************************************
    //it("STEP 3.1: Trying to retrieve stopNumber created above, expected 200", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 3.2:  Create another stop with existing stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 3.2:  Create another stop with existing stopNumber, expected 400", function (done) {
    //    api.post('/api/1/stops/0')
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "transitfare",
    //            stopNumber: oldStopNumber,
    //            latitude: customer.latitude,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 3.2.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 3.2.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4:  get an invalid stop
    //// expected result: fail
    //// ********************************************************
    //it("STEP 4:  get an invalid stop, expected 404", function (done) {
    //    api.get('/api/1/stops/0/-1')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(404);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.1: get a stop and verify agencyNumber is 11
    //// expected result: pass
    //// ********************************************************
    //it("STEP 4.1: get a stop and verify agencyNumber is 11, expected 200", function (done) {
    //    api.get('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.agencyNumber).to.be.equal(11);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.2: Update a stopName
    //// expected result: pass
    //// ********************************************************
    //it("STEP 4.2:  Update a stopName, expected 200", function (done) {
    //    api.put('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "hello",
    //            latitude: customer.latitude,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.stopName).to.be.equal("hello");
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.2.1:  Agency StopVersion should increment
    //// ********************************************************
    //it("STEP 4.2.1: Check agency StopVersion is incremented", function (done) {
    //    oldStopVersion++;
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.3: Attempt to update the stopNumber
    //// expected result: fail
    //// ********************************************************
    //it("STEP 4.3: Attempt to update the stopNumber -> Expect to fail, cannot update stopNumber", function (done) {
    //    api.put('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "hello",
    //            stopNumber: 100,
    //            latitude: customer.latitude,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(400);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.3.1:  Agency StopVersion should not increment
    //// ********************************************************
    //it("STEP 4.3.1: Check agency StopVersion is not incremented", function (done) {
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.4: Attempt to update the latitude
    //// expected result: pass
    //// ********************************************************
    //it("STEP 4.4: Attempt to update the latitude with a valid value 80.111001", function (done) {
    //    api.put('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "hello",
    //            latitude: 80.111001,
    //            longitude: customer.longitude
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.latitude).to.be.equal(80.111001);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.4.1:  Agency StopVersion should increment
    //// ********************************************************
    //it("STEP 4.4.1: Check agency StopVersion is incremented", function (done) {
    //    oldStopVersion++;
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.5: Attempt to update the longitude with a valid value 80.111001
    //// expected result: pass
    //// ********************************************************
    //it("STEP 4.5: Attempt to update the longitude with a valid value 80.111001", function (done) {
    //    api.put('/api/1/stops/0/' + oldStopNumber)
    //        .set('Accept', 'application/json')
    //        .send({
    //            stopName: "hello",
    //            latitude: customer.latitude,
    //            longitude: 80.111001
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.longitude).to.be.equal(80.111001);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 4.5.1:  Agency StopVersion should increment
    //// ********************************************************
    //it("STEP 4.5.1: Check agency StopVersion is incremented", function (done) {
    //    oldStopVersion++;
    //    api.get('/api/1/agency')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            expect(res.body.counters.stopsVersion).to.be.equal(oldStopVersion);
    //            done();
    //        });
    //});
    //
    //var oldID;
    //// ********************************************************
    //// STEP 5:  Create a new device
    //// expected result: pass
    //// ********************************************************
    //it("STEP 5: Create a new device", function (done) {
    //    oldID = deviceID;
    //    api.post('/api/1/device/manage/create')
    //        .set('Accept', 'application/json')
    //        .send({
    //            id: deviceID.toString(),
    //            deviceNumber: deviceID,
    //            deviceModelNumber: deviceID,
    //            deviceName: "test_" + deviceID
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //it("STEP 6:  Logout as authorized user", function (done) {
    //    api.post('/logout')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 7:  login as device
    //// expected result: pass
    //// ********************************************************
    //it("STEP 7: Login as device", function (done) {
    //    api.post('/login')
    //        .set('Accept', 'application/json')
    //        .send({
    //            username: oldID.toString(),
    //            password: oldID.toString()
    //        })
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //// ********************************************************
    //// STEP 8:  get routes for a device
    //// expected result: pass
    //// ********************************************************
    //it("STEP 8: get routes for a device", function (done) {
    //    api.get('/api/1/device/routes.json')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //
    //// ********************************************************
    //// STEP 9:  get stops for a device
    //// expected result: pass
    //// ********************************************************
    //it("STEP 9: get stops for a device", function (done) {
    //    api.get('/api/1/device/stops.json')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
    //
    //
    //it("STEP 10:  Logout as device", function (done) {
    //    api.post('/logout')
    //        .set('Accept', 'application/json')
    //        .end(function (err, res) {
    //            expect(res.status).to.be.equal(200);
    //            done();
    //        });
    //});
