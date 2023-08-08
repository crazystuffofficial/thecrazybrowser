<h1>The crazy browser</h1>
<p>This is a crazy fast browser that hides your ip with an http proxy bare server and keeps your browsing history private</p>
<p>To deploy, click one of the above buttons above, use a terminal with the tutorial below, or download the repository and upload it to any other hosting service you know.</p>
<p>If you want the non-static version (has node.js), then click <a href="https://github.com/crazystuffofficial/browser/">this link</a></p>

<h2>To use the terminal, look below here.</h2>
<p>First, you have to clone this repository with the below prompt:</p>

```
git clone https://github.com/crazystuffofficial/thecrazybrowser
```

<p>Now, change the directory to the repository</p>

```
cd thecrazybrowser
```

<p>Finally, start the repository, and view on port 8080!</p>

```
npm start
```

<p>Enjoy!!!</p>

<h2>To use docker, look below here.</h2>
<p>First, pull the image.</p>

```
docker pull ghcr.io/crazystuffofficial/thecrazybrowser:latest
```

<p>Now start the docker container, and you are free to view the browser!</p>

```
docker run -p 8080:8080 ghcr.io/crazystuffofficial/thecrazybrowser
```
