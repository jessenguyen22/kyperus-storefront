if (!customElements.get("sticky-header")) {
    customElements.define(
      "sticky-header",
      class StickyHeader extends HTMLElement {
        constructor() {
          super();
  
          this.stickyType = this.getAttribute("data-sticky-type") || "none";
          if (this.stickyType === "none") return;
  
          this.currentScrollTop = 0;
          this.onScrollHandler = this.onScroll.bind(this);
          this.preventHide = false; // 阻止隐藏
          this.preventReveal = false; // 阻止重新显示
          this.hideHeaderOnScrollUp = () => (this.preventReveal = true);
        }
  
        connectedCallback() {
          this.header = document.querySelector(".section-header");
          this.headerIsAlwaysSticky =
            this.stickyType === "always" ||
            this.stickyType === "reduce-logo-size";
          this.headerBounds = {}; // header容器界限
  
          this.setHeaderHeight();
  
          window
            .matchMedia("(min-width: 750px)")
            .addEventListener("change", this.setHeaderHeight.bind(this));
  
          if (this.headerIsAlwaysSticky) {
            this.header.classList.add("shopify-section-header-sticky");
          }
  
          this.predictiveSearch = this.querySelector("predictive-search");
  
          // 初始化 body 的 header 状态
          document.documentElement.setAttribute("data-header-status", "visible");
  
          // 添加阻止Header显示
          this.addEventListener("preventHeaderReveal", this.hideHeaderOnScrollUp);
  
          window.addEventListener("scroll", this.onScrollHandler);
  
          this.createObserver();
        }
  
        disconnectedCallback() {
          window.removeEventListener("scroll", this.onScrollHandler);
        }
  
        setHeaderHeight() {
          if (
            document.documentElement.style.getPropertyValue("--header-height") !==
            ""
          )
            return;
          document.documentElement.style.setProperty(
            "--header-height",
            `${this.header.querySelector("header").offsetHeight}px`,
          );
        }
  
        /**
         * 监听初始页面Header的位置
         * 无论 Header 是否显示
         */
        createObserver() {
          const observer = new IntersectionObserver((entries, observer) => {
            this.headerBounds = entries[0].intersectionRect;
  
            observer.disconnect();
          });
  
          observer.observe(this.header);
        }
  
        onScroll() {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
  
          // 当禁用页面滚动或者当打开搜索弹窗
          if (
            document.body.hasAttribute("scroll-y-off") ||
            (this.predictiveSearch && this.predictiveSearch.isOpen)
          )
            return;
  
          if (
            scrollTop > this.currentScrollTop &&
            scrollTop > this.headerBounds.bottom
          ) {
            // 向下滚动并且 header pass
            this.header.classList.add("scrolled-past-header");
            if (this.preventHide) return;
  
            if (!this.headerIsAlwaysSticky)
              requestAnimationFrame(this.hide.bind(this));
          } else if (
            scrollTop < this.currentScrollTop &&
            scrollTop > this.headerBounds.bottom
          ) {
            //  向上滚动并且 header pass
            this.header.classList.add("scrolled-past-header");
            if (!this.preventReveal) {
              if (!this.headerIsAlwaysSticky)
                requestAnimationFrame(this.reveal.bind(this));
            } else {
              // 阻止当前滚动显示Header，然后重置this.preventReveal，让下次滚动继续显示Header
              // debounce效果
              window.clearTimeout(this.isScrolling);
  
              this.isScrolling = setTimeout(() => {
                this.preventReveal = false;
              }, 60);
  
              if (!this.headerIsAlwaysSticky)
                requestAnimationFrame(this.hide.bind(this));
            }
          } else if (scrollTop <= this.headerBounds.top) {
            this.header.classList.remove("scrolled-past-header");
            if (!this.headerIsAlwaysSticky)
              requestAnimationFrame(this.reset.bind(this));
          }
  
          this.currentScrollTop = scrollTop;
        }
  
        // 隐藏header
        hide() {
          this.header.classList.add(
            "shopify-section-header-hidden",
            "shopify-section-header-sticky",
          );
          this.closeDropMenus();
  
          // 更新 body 的 header 状态
          document.documentElement.setAttribute("data-header-status", "hidden");
        }
  
        // 重新显示header
        reveal() {
          this.header.classList.add("shopify-section-header-sticky", "animate");
          this.header.classList.remove("shopify-section-header-hidden");
  
          // 更新 body 的 header 状态
          document.documentElement.setAttribute("data-header-status", "visible");
        }
  
        reset() {
          this.header.classList.remove(
            "shopify-section-header-hidden",
            "shopify-section-header-sticky",
            "animate",
          );
  
          // 恢复 body 的 header 状态
          document.documentElement.setAttribute("data-header-status", "visible");
        }
  
        /**
         * 关闭打开的Menu
         */
        closeDropMenus() {
          this.dropMenus =
            this.dropMenus || this.header.querySelectorAll("drop-menu");
          this.dropMenus.forEach((dropMenu) => dropMenu.close());
        }
      },
    );
  }
  