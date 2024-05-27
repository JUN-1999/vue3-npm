export const mediaType = function (url: string) {
  const imageRegex = /\.(jpg|jpeg|png|gif|svg|webp)$/i;
  const videoRegex = /\.(mp4|webm|ogg|avi|mov|flv|mkv|wmv|mpg|mpeg|m4v|3gp|3g2|mj2|mjpeg)$/i;
  const audioRegex =
    /\.(mp3|wav|ogg|oga|flac|ape|wma|mpc|m4a|aac|alac|ac3|adts|adts2|adts4|adts5|adts_aac_he|adts_aac_ltp|adts_aac_main|adts_aac_ssr|adts_he|adts_ltp|adts_main|adts_ssr|amr|awb|caf|mka|mkv|mp4|mpeg1video|mpeg2video|mpeg4|msvideo|nsv|ogg|ogv|qt|rm|rmvb|roq|svi|thp|tp|tpr|ts|vob|vpx|webm|webp|wmv|yuv)$/i;

  let type = "";
  if (imageRegex.test(url)) {
    type = "image";
  } else if (videoRegex.test(url)) {
    type = "video";
  } else if (audioRegex.test(url)) {
    type = "audio";
  }

  return type;
};