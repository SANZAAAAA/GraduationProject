
// 将file对象转化为image
function fileToImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.readAsDataURL(file); // 将 File 转换为 Data URL
    });
  }

async function resizeImageFile(file, targetWidth) {
    // 1. 将 File 转换为 Image
    const img = await fileToImage(file);
  
    // 2. 创建 Canvas 并计算目标尺寸
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 按比例计算高度
    const scale = targetWidth / img.width;
    const targetHeight = img.height * scale;
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  
    // 3. 启用高质量缩放
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high'; // 可选 'low' | 'medium' | 'high'
  
    // 4. 绘制缩小后的图片
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  
    // 5. 将 Canvas 转换为 Blob，再转回 File
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        // 保留原始文件名和类型信息
        const resizedFile = new File([blob], file.name, {
          type: file.type || 'image/jpeg', // 默认 JPEG
          lastModified: Date.now(),
        });
        resolve(resizedFile);
      }, file.type.startsWith('image/') ? file.type : 'image/jpeg', 0.9); // 质量参数 0.9
    });
  }

export default {fileToImage, resizeImageFile};
