# DiscordPanel
This is a discord panel made for sending embeds through a webhook.

## How to use ##
In order to use this, you have two options, you can either edit the code to use 'Override Mode' where you can add a permanent webhook link (useful if you are using only one webhook & don't  plan on changing it) as well as permanent author information, in case you are the only one using it. If you do not want to use override mode, you don't have to worry about editing the code, but you do have to manually put in a webhook link every time.

### Override Mode ###
To enable override mode:
- Open the javascript file included in this project (`discord.js`)
- Find the variable `override` and change `false` to `true`
- In the `if(override == true)` statement, change the variables included to whatever suits your needs. You can add or remove any from the if statement to permanently use them.
- Open the html file included in this project (`discord.html`) in your browser & use it
- **Note:** At least one value must be filled in to send, it does not matter if it is in override or manually, just make sure to send at least one value (not including the webhook URL). **You must provide a webhook link.**

### Normal Mode ###
If you do not want to enable override mode:
- Open the html file included in this project (`discord.html`) in your browser & use it
- **Note:** At least one value must be filled in to send, make sure to send at least one value (not including the webhook URL). **You must provide a webhook link.**
