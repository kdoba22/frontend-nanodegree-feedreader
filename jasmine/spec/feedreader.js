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


        /* TODO: Write a test that loops through each feed
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

         //  TODO: Write a test that loops through each feed
         // * in the allFeeds object and ensures it has a name defined
         // * and that the name is not empty.         

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
    
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */        

         // define body at this level so that I do not need to defeine it in each of the 'it' blocks

         var body = $('body');

        it('menu element is hidden by default', function(){
            /* associate the variable body with the body tag in the html */
     //       var body = $('body');

            /* The hasClass() method checks if any of the selected elements 
               have a specified class name.  If ANY of the selected elements 
               has the specified class name, this method will return "true". */
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when the menu icon is clicked', function(){

            var menuIcon = $('.menu-icon-link');
//            var body = $('body');
            /* Call the click feature of the menuIcon method */
            menuIcon.click();

            /* checking to see if the menu shows up after a click */
            expect(body.hasClass("menu-hidden")).toBe(false);       

            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(true);     
        });             
    });        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('there is at least one feed', function(done) {
            var entry = $('.feed a').children('.entry');
        /* checking to make sure there is an least one feed */
            expect(entry.length).not.toBe(0);
            done();
        });

     });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var entry,
            entryAfterChange;

        beforeEach(function(done) {
            /*  In JavaScript, the "inner" text of an HTML element refers 
                to the text between any set of HTML tags. */

            // saving text of first entry

            entry = $('.entry')[0].innerText;
            console.log('Doba');
            // load second entry
            loadFeed(1, done);
            
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         it('The contents change when a new feed is loaded', function(done){

            //saving text of the second entry for comaprison
            entryAfterChange =  $('.entry')[0].innerText;
        // compare first entry to second entry
            expect (entry).not.toBe(entryAfterChange);
            done();
         });

        // reset back to the first entry in the list 
            afterEach(function(done) {
                loadFeed(0, done);
            });
    });
});

