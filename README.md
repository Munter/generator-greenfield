generator-greenfield
===========================

[![NPM version](https://badge.fury.io/js/generator-greenfield.svg)](http://badge.fury.io/js/generator-greenfield)
[![Build Status](https://travis-ci.org/Munter/generator-greenfield.svg?branch=master)](https://travis-ci.org/Munter/generator-greenfield)
[![Coverage Status](https://coveralls.io/repos/Munter/generator-greenfield/badge.svg)](https://coveralls.io/r/Munter/generator-greenfield)
[![Dependency Status](https://david-dm.org/Munter/generator-greenfield.svg)](https://david-dm.org/Munter/generator-greenfield)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Munter/generator-greenfield/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

This [Yeoman](http://yeoman.io) generator gives you a full web application development iteration workflow setup, a high quality web performance optimized build output and a very low configuration footprint.

The development workflow uses the [Livestyle](https://github.com/One-com/livestyle) to bring you livereloading. But more than that, it does all your preprocessing like Less, Sass, React Jsx and Autoprefixing.

The basic principles behind the development workflow is that any temporary build artifact, like the resulting CSS from your Sass, is not of any value to you on disk. It only has value in the browser, where you need to consume it. So we keep the file system clean by doing transformations in the HTTP stream. This reduces your need for configuration considerably. No extra gitignores, no double file watching, no `.tmp`-directory, no copying around files in development. Instead, leverage the power of the URL. Point directly at your Sass files form HTML or a RequireJS CSS plugin. It's that simple. Run `grunt serve` to start the server, then edit the files in `app`, and you're half way there!

The production deployment build flow is also quite simple. It automatically figures out what files you are using in your app, based on the source code. It understands the same tricks as the development flow, compiles your Sass and Less, optimizes your images, bundles and compresses your CSS and JavaScript and so forth. The production build does not run automatically on every file change in your `app` folder. Rather than spending time rebuilding constantly, this setup focuses on development iteration speed. You should run a production build with `grunt build` when you are ready to deploy. When you do, you will find your optimized webapp in `dist`. This is the folder you should deploy to your production server.


Installation
------------

This generator packs quite a punch. However, some of this very powerful functionality requires a bit of operating system level installation. Especially the image optimization and manipulation part won't work without some of these extra libraries.

On Ubuntu you can grab them all by running:

```
sudo apt-get install -y libcairo2-dev libjpeg8-dev libgif-dev optipng pngcrush pngquant libpango1.0-dev graphicsmagick libjpeg-progs inkscape
```

Or on OS X, with [homebrew](http://brew.sh/):

```
brew install cairo jpeg giflib optipng pngcrush pngquant pango graphicsmagick jpeg-turbo inkscape
```

To install generator-greenfield from npm, run:

```
npm install -g generator-greenfield
```

Finally, initiate the generator:

```
yo greenfield
```

Caching strategy
----------------

The production build that ends up in `dist` uses md5-hash file renaming for all static assets like CSS, JavaScript and Images. All of these are placed in `dist/static/`. Since the file name contains the hash of the files content, the file name will change whenever the content changes. This leaves you free to set a far future cache expiry on all assets in `/static`. It is highly recommended that you set your production server up to do this. The fastest HTTP request is the one that never has to be made.

**Apache config**

``` htaccess
#Expire Header
<FilesMatch "/static/.+\.[0-9a-f]{10}\.">
  ExpiresDefault "access plus 1 year"
</FilesMatch>
```

**Nginx config**


``` nginx
server {
  location ~* /static/.+\.[0-9a-f]{10}\. {
    expires max;
  }
}
```


The image pipeline
------------------

This workflow setup allows you to manipulate and optimize images in the HTTP stream of the development webserver and during the production build. This means that you can change your workflow from optimizing images in your `app` folder, to simply... not. This has a couple of advantages that can improve your work and collaboration with whomever is responsible for delivering the graphics for your project.

You've probably been in the situation where your designer gives you a nice photo to use on a page. But it's to large in dimensions and quality and needs to be resized and compressed. Or an icon you had delivered contained a boatload of meta information, bloating the size from 100b to 3kb. The good news is that you no longer have to send these back to be reworked, or worse; open an image editor yourself!

What you can do instead is just check the image in as-is. Instead of reworking the raw asset, you preprocess it, just like Sass. You can do this by adding build time annotations to the url of the image like so: `path/to/image.jpg?resize=400,200`. The development server and the build system will understand this and resize the image while they are serving it, giving you a 400x200 pixel image in the browser.

The potential here is huge. You can do several versions of the same image in different sizes and compressions, Hello responsive images! You can have our favicon checked in only once, but have it rendered in the ludicrous 16+ different resolutions you may need for different platforms, just by annotating the URLs. Also, this means you can have your designer check in the images directly themselves, not think about optimization and just get on with their lives. Optimization is simply done by annotations. Obviously the production build does lossless optimization as part of the build by default, so you don't need to put annotations for that in your development cycle.

Read more about the URL annotation syntax here: [express-processimage](https://github.com/papandreou/express-processimage/)


Automated spriting
------------------

Spriting is horrible. Really. It's one of the worst development anti patterns out there. You don't want to to this by hand. The good thing is, you don't have to!

The build system contains an automated spriting step, which works by using URL annotations, just like the other image processing steps. Unlike the other image processing steps, this is only done in the production build, not in your development iteration. The url annoation in CSS looks like this: `background-image: url(path/to/image.png?sprite=spriteName);`.

The concept here is that you should work with your raw individual images in development. Keep everything separate, just like in the good old days of web development while we were all oblivious to web performance problems. In the production build step the system will pick up your annotations, seperate the images into sprites based on the `spriteName` you set, do an optimized 2d packing of each set, render a new combined sprite image and then replace all the CSS properties that previously pointed at any image in the sprite.

**TODO:** Link to advanced sprite config documentation

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
