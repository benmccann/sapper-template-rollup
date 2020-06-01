# Bug reproduction

The original code is at https://github.com/benmccann/sapper-template-rollup/tree/image. This is a stripped down version

## Running

```
npm install
npm run build
```

Open __sapper__/build/client/465898c830bb9d2c.jpg in an image viewer. It will be corrupted.

## Notes

If I add `fileName: '[dirname][name]-[hash][extname]',` to the URL plugin config then the file is not corrupted

I stripped the original code down significantly. There is still a bit of code left unrelated to the url plugin, but it is far more minimal and what is left is mostly from other projects that Rich created.
