With this chrome-extension you can move between tabs and toggle to certain tabs and back.

<p>
Commands <br>
<table border="black solid 1px">
	<tr>
		<td>Alt+h</td>
		<td>move left</td>
	</tr>
	<tr>
		<td>Alt+l</td>
		<td>move right</td>
	</tr>
	<tr>
		<td>Alt+w</td>
		<td>move to web.whatsapp</td>
	</tr>
	<tr>
		<td>Alt+t</td>
		<td>move to web.telegram</td>
	</tr>
</table>
</p>
<p>
	You can add your own tab to toggle in manifest.json. Under commands add toggle*yourtab* and 
	hotkey you like. It's case-sensitive.
	For example toggleYouTube means trying to match tab with word YouTube in it.
	Follow the syntax of original values to succeed. 
</p>
<p>
	However right now you can't add more commands,
	because chrome only supports 4 so you have to replace some existing one.
</p>
