// The link to status codes in the Discord API
// Put it here to avoid clutter
var resultsLink = "https://discord.com/developers/docs/topics/opcodes-and-status-codes#http' target='_blank";

// Options
var confirmClear = true; // Should a confirmation box appear when clearing settings?
var override = false; // Should settings be overriden, only for private use cases
var clearOnSend = true; // Should settings be cleared after webhook is sent?

// ran when the 'send message' button gets pressed
function GetValues() {

    console.log('Button Pressed, Finding Values.'); // debugging console

    // gets info from value
    var url = document.getElementById('Webhook').value.replaceAll('"', "''"); // gets webhook url
    var title = document.getElementById('Title').value.replaceAll('"', "''"); // gets title
    var description = document.getElementById('Description').value.replaceAll('"', "''"); // gets description
    var imageURL = document.getElementById('ImageURL').value.replaceAll('"', "''"); // gets image url
    var thumbnailURL = document.getElementById('ThumbnailURL').value.replaceAll('"', "''"); // gets thumbnail url 
    var author = document.getElementById('AuthorName').value.replaceAll('"', "''"); // gets author name
    var authorURL = document.getElementById('AuthorURL').value.replaceAll('"', "''"); // gets author url
    var authorImageURL = document.getElementById('AuthorImageURL').value.replaceAll('"', "''"); // gets author image url
    var footer = document.getElementById('Footer').value.replaceAll('"', "''"); // gets footer title
    var footerImage = document.getElementById('FooterImageURL').value.replaceAll('"', "''"); // gets footer image url

    // gets color from values
    var RedValue = parseInt(document.getElementById('Red').value);
    var GreenValue = parseInt(document.getElementById('Green').value);
    var BlueValue = parseInt(document.getElementById('Blue').value);
    // converts RGB to APPRX. DECIMAL
    var colorsTotal = parseInt((RedValue * 65536) + (GreenValue * 256) + BlueValue);

    console.log('Color Value: Red ' + RedValue + ' Blue ' + BlueValue + ' Green ' + GreenValue); // debugging console
    console.log('Color Value (DECIMAL): ' + colorsTotal); // debugging console

    if(override == true) {
        // if public make sure these variables are set to nothing
        // these values can be changed & swapped for other defaults
        // overrides the url
        url = "";
        author = ""; // overrides the author name
        authorURL = ""; // overrides the author url
        authorImageURL = ""; // overrides the author image

        console.log('Override is enabled, some values have been overwritten.'); // debugging console
    }

    console.log('Checking if URL is NULL'); // debugging console

    // checks to make sure the url is not empty
    if(url == "") {
        // if it is, gives public error code
        document.getElementById('Results').innerHTML = "Error Code S1: Must Provide Webhook URL";
        console.log('ERROR: Code S1: Must Provide Webhook Link'); // debugging console
        return; // if there is no url, stops code execution
    }

    console.log("URL is not NULL, continuing."); // debugging console

    // runs a different function with all needed values plugged in (creates json)
    CreateJson(url,title,description,imageURL,thumbnailURL,author,authorURL,authorImageURL,footer,footerImage,colorsTotal);
}

// runs at end of button press, and creates json file
function CreateJson(url,title,description,imageURL,thumbnailURL,author,authorURL,authorImageURL,footer,footerImage,colorsTotal) {

    console.log('Creating JSON File'); // debugging console

    // creates json file with all variables plugged into it
    let data = `{
        "content":"@everyone",
        "embeds": [
            {
                "type":"rich",
                "title":"`+title+`",
                "description":"`+description+`",
                "color":"`+colorsTotal+`",
                "image": {
                    "url":"`+imageURL+`",
                    "height":"0",
                    "width":"0"
                },
                "thumbnail": {
                    "url":"`+thumbnailURL+`",
                    "height":"0",
                    "width":"0"
                },
                "author": {
                    "name":"`+author+`",
                    "url":"`+authorURL+`",
                    "icon_url":"`+authorImageURL+`"
                },
                "footer": {
                    "text":"`+footer+`",
                    "icon_url":"`+footerImage+`"
                }
            }
        ]
    }`

    console.log('JSON File Created'); // debugging console
    console.log(data); // debugging console

    // runs a different function with all needed values plugged in (sends webhook request)
    SendWebhook(url,data);

}

// runs after json was created
function SendWebhook(url,data) {
    
    console.log('Attempting To Send Webhook'); // debugging console
    
    console.log('Creating Webhook Send Request'); // debugging console

    let WebhookSend = new XMLHttpRequest(); // creates web request
    WebhookSend.open("POST", url); // sets it to a post request

    console.log('Setting Request Headers'); // debugging console

    WebhookSend.setRequestHeader('Accept',"application/json"); // sets it to accept json files
    WebhookSend.setRequestHeader('Content-Type',"application/json"); // sets it to send json files

    console.log('Attempting To Send Data'); // debugging console

    WebhookSend.send(data); // sends json file from earlier in code execution

    // once the web request loads
    WebhookSend.onload = () => {
        var status = WebhookSend.status; // creates a variable with status
        console.log('Response Status: ' + status); // debugging console, prints status
        if (status == 204) { // checks if status was success
            // if it was, writes response with success tag
            document.getElementById('Results').innerHTML = "Success: Response Status: <a href='"+resultsLink+"' target='_blank'>" + status; + "</a>"
            if(clearOnSend == true) {
                console.log("Clear On Send Set To True, Clearing Settings");
                ClearSettings();
            }
        } else {
            // if it was not, writes response with error tag
            document.getElementById('Results').innerHTML = "Error: Response Status: <a href='"+resultsLink+"' target='_blank'>" + status; + "</a>"
        }
    }

}

// updates background color live
function ColorChanged() {
    console.log('Color Changed'); // debugging console

    console.log('Updating Color Variables'); // debugging console

    var Red = parseInt(document.getElementById('Red').value); // sets color red to input
    var Green = parseInt(document.getElementById('Green').value); // sets color green to input
    var Blue = parseInt(document.getElementById('Blue').value); // sets color blue to input

    console.log('Updating Input Fields'); // debugging console

    document.getElementById('RedInput').value = Red; // sets input red to actual value if slider changes
    document.getElementById('GreenInput').value = Green; // sets input green to actual value if slider changes
    document.getElementById('BlueInput').value = Blue; // sets input blue to actual value if slider changes

    console.log('Calculating Decimal Value'); // debugging console

    var Color = parseInt((Red * 65536) + (Green * 256) + Blue); // calculates decimal value of rgb
    
    console.log('Color Value: Red ' + Red + ' Green ' + Green + ' Blue ' + Blue); // debugging console
    console.log('Color Value (DECIMAL): ' + Color); // debugging console

    document.getElementById('ColorChange').style.backgroundColor = "rgb("+Red+","+Green+","+Blue+")"; // changes background based on color
    
    document.getElementById('ColorDecimal').value = Color;
}

function ColorInputChanged() {

    console.log('Color Input Changed'); // debugging console

    console.log('Checking If In Range');

    // LOCKS RANGE OF INPUT FROM 0 => 255
    if(document.getElementById('RedInput').value < 0) {
        document.getElementById('RedInput').value = 0;
    } else if (document.getElementById('RedInput').value > 255) {
        document.getElementById('RedInput').value = 255;
    }
    // LOCKS RANGE OF INPUT FROM 0 => 255
    if(document.getElementById('GreenInput').value < 0) {
        document.getElementById('GreenInput').value = 0;
    } else if (document.getElementById('GreenInput').value > 255) {
        document.getElementById('GreenInput').value = 255;
    }
    // LOCKS RANGE OF INPUT FROM 0 => 255
    if(document.getElementById('BlueInput').value < 0) {
        document.getElementById('BlueInput').value = 0;
    } else if (document.getElementById('BlueInput').value > 255) {
        document.getElementById('BlueInput').value = 255;
    }

    console.log('Changing Slider To Input Value'); // debugging console

    document.getElementById('Red').value = document.getElementById('RedInput').value; // sets slider to input value if input changes
    document.getElementById('Blue').value = document.getElementById('BlueInput').value; // sets slider to input value if input changes
    document.getElementById('Green').value = document.getElementById('GreenInput').value; // sets slider to input value if input changes

    console.log('Updating Colors'); // debugging console

    ColorChanged(); // runs color change function to update it

}

function ColorDecimalChanged() {

    console.log('Decimal Input Changed');

    console.log('Checking If In Range');

    // LOCKS RANGE OF INPUT FROM 0 => 16777215
    if(document.getElementById('ColorDecimal').value > 16777215) {
        document.getElementById('ColorDecimal').value = 16777215;
    } else if (document.getElementById('ColorDecimal').value < 0) {
        document.getElementById('ColorDecimal').value = 0;
    }

    var ColorDecimal = document.getElementById('ColorDecimal').value; // gets decimal value

    var Blue = parseInt(ColorDecimal / 65536); // calculates decimal value to blue
    var Green = parseInt((ColorDecimal - Blue * 65536) / 256); // calculates decimal value to green
    var Red = parseInt(ColorDecimal - Blue * 65536 - Green * 256); // calculates decimal value to red

    console.log('RGB FROM DECIMAL: Red ' + Red + ' Green ' + Green + ' Blue ' + Blue);

    document.getElementById('Red').value = Red;
    document.getElementById('Green').value = Green;
    document.getElementById('Blue').value = Blue;

    console.log('Updating Color Inputs'); // debugging console

    ColorChanged(); // runs color changed to update them

    console.log('When changing decimal value, you may notice a jump, as it rounds nearest int for RGB values');
}

// clears values on button press    
function ClearSettingsParse() {

    console.log('Button Pressed, Checking For Clear')
    if(confirmClear == true) {
        console.log('Confirmation Required')
        if(confirm("Are You Sure You Want To Clear Settings")) {
            console.log('Confirmation = True, Proceeding')
            ClearSettings();
            return;
        }
        console.log('Confirmation = False, Cancelling')
    } else {
        console.log('Confirmation Not Required, Proceeding')
        ClearSettings();
        return;
    }
}

function ClearSettings() {
    console.log('Clearing Settings'); // debugging console

    // clears all values, apart from color
    document.getElementById('Webhook').value = "";
    document.getElementById('Title').value = "";
    document.getElementById('Description').value = "";
    document.getElementById('ImageURL').value = "";
    document.getElementById('ThumbnailURL').value = "";
    document.getElementById('AuthorName').value = "";
    document.getElementById('AuthorURL').value = "";
    document.getElementById('AuthorImageURL').value = "";
    document.getElementById('Footer').value = "";
    document.getElementById('FooterImageURL').value = "";
}