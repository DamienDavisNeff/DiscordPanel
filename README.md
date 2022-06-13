# DiscordPanel
This is a discord panel made for sending embeds through a webhook.

## How to use ##
In order to use this, you have two options, you can either edit the code to use 'Override Mode' where you can add a permanent webhook link (useful if you are using only one webhook & don't  plan on changing it) as well as permanent author information, in case you are the only one using it. If you do not want to use override mode, you don't have to worry about editing the code, but you do have to manually put in a webhook link every time.

For proper use, all files included must be included _in the same directory._

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

### Clear On Send ###
By Default, Settings Are Cleared When A Message Is Sent. To Change This
- Open the javascript file included in this project (`discord.js`)
- Find the variable `clearOnSend` and change `true` to `false`
### Clear Confirmation ### 
By Default, Clear Confirmation Is Enabled (A Dialoug Will Appear To Avoid Accidental Clears). To Change This
- Open the javascript file included in this project (`discord.js`)
- Find the variable `confirmClear` and change `true` to `false`

### Latest Version Update ###
Changed options to be global variables, to help future me in adding new options & to help the user locate all settings

<a href="https://www.github.com/DamienDavisNeff/DiscordPanel" target="_blank">Discord Panel</a> © 2022 by <a href="https://www.github.com/DamienDavisNeff" target="_blank">Damien DavisNeff</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC BY-SA 4.0</a>
