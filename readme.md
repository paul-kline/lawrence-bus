# Lawrence Bus Helper

This page is available live at : https://paul-kline.github.io/lawrence-bus/

Note that you will not see much! You are required to give two get parameters that are arrays.

1. parameter 1 is the list of stops you're interested in. You can list one stop or multiple.
   stops=[369]
   stops=[369,91]
2. parameter 2 is the specific routes at given stops you are interested in. This should be a union of all routes at all stops you're interested in.
   routes=[10]
   routes=[10,30]

### For example:

I frequenty take the bus to/from my apartment and to/from engineering on routes 10 or 30--both get me to where I want to go.

- The closest KU bound stop from my apt is stop 91 and is frequented by routes 10 and 30.
- The closest stop TO my apt FROM engineering is stop 369. Again, I only care about routes 10 and 30.

Here would be my url I keep a link to on my phone's homescreen:

##### https://paul-kline.github.io/lawrence-bus/?stops=[369,91]&routes=[10,30]

## Noteable Features:

- Of the stops listed, they are **sorted top to bottom by how close you are**. Cool! This allows you to have one URL that shows you your most relevant information depending on where you are.
- 'live' and 'scheduled' arrivals are both listed for the given stops. The **'live' estimates are highlighted** since they are the ones you care about.
- **Data is automatically refreshed** every 5 seconds. For reassurance of recency, each stop has an 'updated:' field indicating when the last time data was pulled from the server. This only occurs whenever the page is visible.
- Pretty formatting :)
- **Static information** (like routes and stops information) is stored in localStorage so subsequent page visits are very fast and don't use your data!
