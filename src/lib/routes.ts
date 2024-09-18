export const pages = {
  "/": "/",
  "/page/upload-image": "/page/upload-image",
  "/page/text-editor": "/page/text-editor",
  "/page/scroll-flex": "/page/scroll-flex",
  "/page/scroll-bottom": "/page/scroll-bottom",
  "/page/revalidate-tag": "/page/revalidate-tag",
  "/page/revalidate-path": "/page/revalidate-path",
  "/page/react-html": "/page/react-html",
  "/page/pwa": "/page/pwa",
  "/page/pdf": "/page/pdf",
  "/page/pararel-route": "/page/pararel-route",
  "/page/pararel-route/@par2": "/page/pararel-route/@par2",
  "/page/pararel-route/@par1": "/page/pararel-route/@par1",
  "/page/mqtt": "/page/mqtt",
  "/page/map": "/page/map",
  "/page/login-github": "/page/login-github",
  "/page/download-button": "/page/download-button",
  "/page/custom-hookstate": "/page/custom-hookstate",
  "/page/copy-dir": "/page/copy-dir",
  "/page/copy-dir/[dir]": ({ dir }: { dir: string }) => `/page/copy-dir/${dir}`,
  "/page/calendar": "/page/calendar",
  "/page/auth": "/page/auth",
  "/dev": "/dev",
  "/dev/page/create-menu": "/dev/page/create-menu",
};

export const apies = {
  "/page/upload-image/api/upload": "/page/upload-image/api/upload",
  "/page/upload-image/api/image": "/page/upload-image/api/image",
  "/page/revalidate-tag/api/revalidate-tag":
    "/page/revalidate-tag/api/revalidate-tag",
  "/page/mqtt/api/send-message": "/page/mqtt/api/send-message",
  "/page/copy-dir/api/[dir]/list": ({ dir }: { dir: string }) =>
    `/page/copy-dir/api/${dir}/list`,
  "/page/copy-dir/api/[dir]/create": ({ dir }: { dir: string }) =>
    `/page/copy-dir/api/${dir}/create`,
};
