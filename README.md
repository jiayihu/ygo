# YuGiOh!

<p align="center">
  <a href="https://github.com/jiayihu/ygo">
    <img alt="YuGiOh" src="./logo.png">
  </a>
</p>

A YuGiOh! Progressive Web Application built with Custom Elements and [HyperHTML](https://github.com/WebReflection/hyperHTML).

The project uses the following technologies:

- [HyperHTML-Element](https://github.com/WebReflection/hyperHTML-Element) for declarative Custom Elements based on hyperHTML
- [Bulma](https://bulma.io/) for some CSS parts in Shadow DOM
- [Workbox](https://developers.google.com/web/tools/workbox/) for Service Worker and API caching
- [now.sh](https://zeit.co/now) as static hosting and API proxy

## Browser support

Only Chrome 67+ with native Custom Elements is supported for the time being. Polyfills for Custom Elements and Shadow DOM will be provided in future.

Other polyfills like CSS custom properties are not in the interest of this side-project.

## Install

Install the dependencies:

```
npm install
```

Then start the development server on [localhost:3000](http://localhost:3000/):

```
npm start
```

## Building

The build will generate the files in `/public` folder.

```
npm run build
```

## CORS Proxing

A Node proxy is deployed on [ygo-api.now.sh](https://ygo-api.now.sh/) as proxy to allow CORS requests towards the underlying cards API. It uses [cors-anywhere](https://github.com/Rob--W/cors-anywhere/) and the source code is in the folder `/server/`.

## Credits

Thanks to [pokedex.org](https://www.pokedex.org/), where I got the idea and ispiration of building a similar website for YuGiOh. Of course mine side-project cannot match its [architecture](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org) and all the cool techniques developed by [@nolanlawson](https://github.com/nolanlawson).

Thanks also to [Yu-Gi-Oh Prices](http://yugiohprices.com/) for providing the card APIs.
