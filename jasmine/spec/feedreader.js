/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeeds URLs are defined', function(){
            allFeeds.forEach(function(feed){
                // checking that the URL is defined
                expect(feed.url).toBeDefined();
            });
        });

        it('allFeeds URLs are not empty', function(){
            allFeeds.forEach(function(feed){
                // checking that the URL is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });  

        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.         
        */ 

        it('allFeeds names are defined', function(){
            allFeeds.forEach(function(feed){
                // checking that the allFeeds name is defined
                expect(feed.name).toBeDefined();
            });
        });
               
        it('allFeeds names are not empty', function(){
            allFeeds.forEach(function(feed){
                // checking that the allFeeds name is not empty
                expect(feed.name.length).not.toBe(0);
            });
        });       
    }); 
    
    /* New test suite named "The menu" */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default. 
         */        

        // define body at this level so that I do not need to defeine it in each of the 'it' blocks

        var body = $('body');

        it('Menu element is hidden by default', function(){
            /* The hasClass() method checks if any of the selected elements 
               have a specified class name.  If ANY of the selected elements 
               has the specified class name, this method will return "true". */
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

        /* This test that ensures the menu changes 
          * visibility when the menu icon is clicked. 
          */
        it('Menu changes visibility when the menu icon is clicked', function(){

            var menuIcon = $('.menu-icon-link');
            /* Call the click feature of the menuIcon method */
            menuIcon.click();

            /* checking to see if the menu shows up after a click */
            expect(body.hasClass("menu-hidden")).toBe(false);      
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(true);     
        });             
    });        

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('There is at least one feed', function(done) {
        //    var entry = $('.feed a').children('.entry');
            var entry = $('.feed .entry');
        /* checking to make sure there is an least one feed */
            expect(entry.length).not.toBe(0);
            done();
        });

     });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var entry;

        beforeEach(function(done) {
            loadFeed(1, (function() {
                entry = $(".feed").html();
            }));

            done();
        });
        /* Test to ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('content changes when a new feed is loaded', function(done) {
            loadFeed(2, done);

            expect($(".feed").html()).not.toEqual(entry);
        });

        // reset back to the first entry in the list 
        afterEach(function(done) {
            loadFeed(0, done);
        });
    });    
});