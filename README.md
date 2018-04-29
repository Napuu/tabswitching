With this extension you can move between tabs using vim-like commands. Also toggling to certain tabs and back.

Commands: 
	move left: Alt+h
	move right: Alt+l
	move to web.whatsapp (and back to original tab): Alt+w
	move to web.telegram (and back to original tab): Alt+t

You can add your own tab to toggle in manifest.json. Under commands add toggle*yourtab* and 
hotkey you like. It's case-sensitive because it moves to tab with title matching part after word toggle.
For example toggleYouTube means trying to match tab with word YouTube in it.
Follow the syntax of original values to succeed. 

However right now you can't add more commands,
because chrome only supports 4 so you have to replace some existing one.
