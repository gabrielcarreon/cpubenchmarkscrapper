export const scrapObj = {
  cpu : {
    link: 'https://www.cpubenchmark.net/CPU_mega_page.html',
    out: 'cpu.json',
    regex: /^https:\/\/www\.cpubenchmark\.net\/data\/\?.*$/,
  },
  gpu: {
    link: 'https://www.videocardbenchmark.net/GPU_mega_page.html',
    out: 'gpu.json',
    regex: /^https:\/\/www\.videocardbenchmark\.net\/data\/\?.*$/,
  }
}