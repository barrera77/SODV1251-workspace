# README: 1.4: Creating CSS Animations and Transitions Report

This document provides an brief but detailed look into the animations and transitions implemented in the CSS of the website. It explains the thought process behind each animation, the CSS properties used, and the optimization techniques applied to enhance performance.

## Animations

**1. Announcements Scroll Animation**

Description: The `.announcements-content` element scrolls horizontally to create a continuous scrolling effect for announcements.

```css
.announcements-content {
  display: inline-block;
  gap: 50px;
  animation: slide 12s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-100%);
  }
}
```

The rpocess for the keyframe animation `slide` creates a smooth horizontal scrolling effect that loops infinitely. The animation is set to run continuously, allowing the announcements to scroll indefinitely. The `linear` timing function ensures a consistent scrolling speed.

**Optimization Techniques:**

**Animation Timing:** A 12s duration ensures smooth movement without being too fast or slow, optimizing user experience without causing excessive CPU/GPU usage.

`animation-play-state`: The animation pauses when the user hovers over the announcements, preventing unnecessary processing when not in view.

**2. Logo Color Change Animation**
Description: The `.logo-container` element has a color-changing animation applied to its text to attract attention.

```css
.logo-container {
  animation-name: example;
  animation-duration: 5s;
}

@keyframes example {
  0% {
    color: var(--orange);
  }
  25% {
    color: var(--purple);
  }
  50% {
    color: var(--blue);
  }
  100% {
    color: var(--pink);
  }
}
```

The process for the `example` keyframe animation transitions through various colors to make the logo stand out. This animation helps draw attention and adds a dynamic visual element.

**Optimization Techniques:**
Duration: A 5s duration balances visual appeal and performance, ensuring the animation is noticeable but not distracting.
Performance Considerations: Using `color` instead of `transform` or `opacity` helps reduce rendering costs.

**3. Mobile Menu Transition**

Description: The `.menu` and `.submenu` elements use transitions for smooth appearance and disappearance effects.

```css
.menu.active {
  transition: max-height 1s ease-in-out;
}

.submenu {
  transition: all 0.3s ease-in-out;
}
```

The process for the `max-height` transition provides a smooth expansion effect for the mobile menu, while `all` on `.submenu` ensures smooth visibility transitions.

**Optimization Techniques:**

**Efficient Transitions**: Using `max-height` instead of `height` or `transform` helps avoid costly recalculations during the animation.

**Performance Considerations**: The `ease-in-out` timing function provides a smooth transition that avoids jarring movements.

## Transitions

**1. Card Hover Effects**

Description: Cards have hover effects that change the background image and display additional information.

```css
.card-one:hover {
  background-image: url("../assets/image/favs-6-hover.jpg");
}

.favs-card:hover .favs-card-image {
  opacity: 0.3;
}

.favs-card:hover .card-image-info {
  opacity: 1;
}
```

The process for the hover effects on cards improve interactivity and user engagement. Changing the background image and adjusting opacity highlights card information effectively.

## Optimization Techniques

**Opacity Transitions**: Smooth opacity changes avoid performance hits compared to more complex animations.
**Image Handling**: Using `background-image` for hover effects minimizes re-rendering compared to other image manipulation techniques.

## Flip Card Animation

The `.flip-card` uses a 3D flip effect to reveal additional content.

```css
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateX(180deg);
}
```

The process for the 3D flip effect provides an engaging way to display additional information, adding a modern touch to the design.

## Optimization Techniques

**Perspective and Transform**: Utilizing `transform` and `perspective` helps offload rendering tasks to the GPU, improving performance.
