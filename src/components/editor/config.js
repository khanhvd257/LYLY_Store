import plugins from "./plugins";
import toobar from "./toolbar";

export const initEditor = {
  height: "400px",
  // language: (window.localStorage.getItem('lang') === 'vi_VN') && 'vi',
  menubar: "file edit  view format table",
  toolbar: toobar,
  plugins: plugins,
  object_resizing: false,
  end_container_on_empty_block: true,
  powerpaste_word_import: "merge",
  advlist_bullet_styles: "square",
  maxSize: "2097152",
  accept: "image/jpeg, image/png",
  // images_upload_handler: async function (blobInfo, success, failure) {
  //   const formData = new FormData();
  //   formData.append("file", blobInfo.blob());
  //   try {
  //     const res = await upLoadFile(formData);
  //     if (res.result) {
  //       success(res.result)
  //     } else {
  //       failure(this.$t('There was an error when uploading the file, please try again later'));
  //     }
  //   } catch (e) {
  //     failure(this.$t('Upload error'))
  //   }
  // },
  // init_instance_callback: function (editor) {
  //   var freeTiny = document.querySelector(".tox .tox-notification--in .tox-notification .tox-notification--warning .tox .tox-notification--warning .tox-notifications-container");
  //   freeTiny.style.display = "none";
  // },
  content_style: `
    * { padding:0; margin:0; }

    html, body height:100%; }

    img { max-width:100%; display:block;height:auto; }

    a   { text-decoration: none; }

    iframe{ width: 100%; }

    p { line-height:1.6; margin: 0px; }

    table{ word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }

    .mce-object-iframe{ width:100%; box-sizing:border-box; margin:0; padding:0; }

    ul,ol{ list-style-position:inside; }
    `,
  statusbar: false,
  elementpath: false,
  paste_data_images: true,
};
