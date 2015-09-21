# flickrbg

Take a random image from a photoset in flickr and set it as the background.

## Requirements

Linux with "feh" installed

```shell
sudo apt-get install feh
```

## Usage

```shell
export FLICKR_API_KEY="some-flickr-api-key" && export FLICKR_PHOTOSET_ID="some-photoset-id" && export FLICKR_USER_ID="the-userid-of-the-photoset-owner" && node /path/to/flickrbg/index.js | sh
```
