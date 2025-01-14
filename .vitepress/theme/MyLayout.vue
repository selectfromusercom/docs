<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template lang="pug">
Layout
  //- template(#sidebar-nav-after)
  //-   //- p.text-xs.text-zinc-600.font-bold 셀렉트어드민 
  //-   p.text-xs.text-zinc-400.font-medium © 2025 Selectfromuser Inc.
  template(#home-features-after)
    .bg-zinc-50
    .mt-8
      .container.mx-auto.flex.flex-wrap.px-4(style='max-width: 1152px;')
        div.p-5.text-neutral-600(style='width: 240px')
          //- p.text-sm.font-bold © 2025 Selectfromuser Inc.
          //- p.text-xs.text-zinc-600.font-bold SelectAdmin
          p.text-xs.text-zinc-400.font-medium © 2025 Selectfromuser Inc.
          .mb-2
          
          
        
        .ms-auto
          .flex.flex-wrap.pb-5
            div.p-4(style='width: 160px;')
              div.flex.flex-col.gap-1.p-2
                h5.text-bold.text-base.text-neutral-600.font-medium.mb-3 Product
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/product/how-it-works') How It Works
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/product/select-admin') Select Admin
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/product/align') Align
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/product/integration') Integration
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/product/row-level-security') Security Model
            div.p-4(style='width: 160px;')
              div.flex.flex-col.gap-1.p-2
                h5.text-bold.text-base.text-neutral-600.font-medium.mb-3 Reference
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/resources') Resource Center
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/solutions') Solutions
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/product/how-it-works') Use Cases
                
            div.p-4(style='width: 160px;')
              div.flex.flex-col.gap-1.p-2
                h5.text-bold.text-base.text-neutral-600.font-medium.mb-3 Service
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/resources/developer-quickstart') FAQ
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://rebrand.ly/3c99gmp') Community
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/pricing') Pricing
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/get-in-touch') Contact Sales
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://status.selectfromuser.com/') Service Status
            div.p-4(style='width: 160px;')
              div.flex.flex-col.gap-1.p-2
                h5.text-bold.text-base.text-neutral-600.font-medium.mb-3 Company
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/resources') Blog
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://ysgteam.notion.site/SaaS-B2B-by-bf26e8c9605744aa9c710a62cdc36b41') Saas Book
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://docs.selectfromuser.com/') Documentation
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/terms') Terms
                a.text-bold.text-sm.block(class="hover:underline underline-offset-2" href='https://www.selectfromuser.com/privacy') Privacy
</template>