// Function to open the Login Offcanvas
function openLoginOffcanvas() {
    // Close the Sign Up Offcanvas
    var signupOffcanvasElement = document.getElementById('signupOffcanvas');
    var signupOffcanvas = bootstrap.Offcanvas.getInstance(signupOffcanvasElement);
    signupOffcanvas.hide();
   
    // Open the Login Offcanvas
    var loginOffcanvasElement = document.getElementById('loginOffcanvas');
    var loginOffcanvas = new bootstrap.Offcanvas(loginOffcanvasElement);
    loginOffcanvas.show();
}   

function openSignupOffcanvas() {
    // Close the Login Offcanvas
    var loginOffcanvasElement = document.getElementById('loginOffcanvas');
    var loginOffcanvas = bootstrap.Offcanvas.getInstance(loginOffcanvasElement);
    loginOffcanvas.hide();

    // Open the Sign Up Offcanvas
    var signupOffcanvasElement = document.getElementById('signupOffcanvas');
    var signupOffcanvas = new bootstrap.Offcanvas(signupOffcanvasElement);
    signupOffcanvas.show();
   
}   