// 图片占位符组件 - 实现骨架屏效果（支持暗色模式）
const ImagePlaceholder = ({ aspectRatio }: { aspectRatio: string }) => (
  <div
    className={`w-full ${aspectRatio} rounded-md overflow-hidden animate-shimmer bg-skeleton`}
  >
    <style>{`
      /* 自定义骨架屏背景 */
      .bg-skeleton {
        background: linear-gradient(
          90deg, 
          var(--skeleton-color, #f0f0f0) 25%, 
          var(--skeleton-highlight, #e0e0e0) 50%, 
          var(--skeleton-color, #f0f0f0) 75%
        );
        background-size: 200% 100%;
      }
      
      /* 亮色模式变量 */
      :root {
        --skeleton-color: #f0f0f0;
        --skeleton-highlight: #e0e0e0;
      }
      
      /* 暗色模式变量 */
      @media (prefers-color-scheme: dark) {
        :root {
          --skeleton-color: #2d2d2d;
          --skeleton-highlight: #3d3d3d;
        }
      }
      
      .dark {
        --skeleton-color: #2d2d2d;
        --skeleton-highlight: #3d3d3d;
      }
    `}</style>
  </div>
);

export { ImagePlaceholder };
