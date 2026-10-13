const PRODUCTS = [
 {id:"sonic",name:"Sonic Arc Headphones",category:"Audio",price:8999,was:10999,desc:"Immersive sound. All-day comfort.",symbol:"◉",tag:"BESTSELLER",rating:"4.9"},
 {id:"pulse",name:"Pulse Mini Speaker",category:"Audio",price:4299,was:null,desc:"Big feeling, compact form.",symbol:"◍",tag:"NEW ARRIVAL",rating:"4.8"},
 {id:"keys",name:"Form Mechanical Keyboard",category:"Workspace",price:6499,was:7499,desc:"Tactile keys for clear thinking.",symbol:"⌨",tag:"NOVA PICK",rating:"4.7"},
 {id:"stand",name:"Lift Aluminium Stand",category:"Workspace",price:2799,was:null,desc:"A better angle for better work.",symbol:"⌑",tag:"ESSENTIAL",rating:"4.8"},
 {id:"hub",name:"Orbit USB-C Hub",category:"Workspace",price:3499,was:3999,desc:"One hub. More possibilities.",symbol:"⌘",tag:"POPULAR",rating:"4.6"},
 {id:"lamp",name:"Halo Smart Lamp",category:"Smart Living",price:5199,was:null,desc:"A softer way to light the room.",symbol:"◉",tag:"SMART HOME",rating:"4.8"},
 {id:"plug",name:"Nook Smart Plug Duo",category:"Smart Living",price:1899,was:null,desc:"Simple control for everyday power.",symbol:"▣",tag:"TWO-PACK",rating:"4.5"},
 {id:"tracker",name:"Loop Item Tracker",category:"Smart Living",price:2299,was:2599,desc:"Keep close to what matters.",symbol:"◎",tag:"TRAVEL READY",rating:"4.7"}
];
const state={category:"All",query:"",sort:"featured",cart:{}};
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
const $=s=>document.querySelector(s);
const grid=$("#product-grid");
function filteredProducts(){let p=PRODUCTS.filter(x=>(state.category==="All"||x.category===state.category)&&`${x.name} ${x.category} ${x.desc}`.toLowerCase().includes(state.query.toLowerCase()));if(state.sort==="low")p.sort((a,b)=>a.price-b.price);if(state.sort==="high")p.sort((a,b)=>b.price-a.price);return p}
function renderProducts(){const p=filteredProducts();grid.innerHTML=p.length?p.map(x=>`<article class="product-card"><div class="product-image"><span class="product-tag">${x.tag}</span><span class="product-symbol" aria-hidden="true">${x.symbol}</span><button class="quick-add" data-add="${x.id}" aria-label="Add ${x.name} to bag">+</button></div><div class="product-info"><span class="product-category">${x.category}</span><div class="product-name-row"><strong class="product-name">${x.name}</strong><span class="product-rating">★ ${x.rating}</span></div><p class="product-desc">${x.desc}</p><div class="product-price">${money(x.price)} ${x.was?`<del>${money(x.was)}</del>`:""}</div></div></article>`).join(""):`<p>No products match that search. Try another term.</p>`}
function cartQty(){return Object.values(state.cart).reduce((a,b)=>a+b,0)}
function cartTotal(){return Object.entries(state.cart).reduce((sum,[id,q])=>sum+PRODUCTS.find(p=>p.id===id).price*q,0)}
function renderCart(){const entries=Object.entries(state.cart).filter(([id,q])=>q>0);$("#cart-count").textContent=cartQty();$("#drawer-count").textContent=`(${cartQty()})`;$("#cart-subtotal").textContent=money(cartTotal());$("#checkout-total").textContent=money(cartTotal());$("#cart-items").innerHTML=entries.length?entries.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return `<div class="cart-line"><div class="cart-thumb">${p.symbol}</div><div><strong>${p.name}</strong><small>${money(p.price)} each</small><div class="qty-controls"><button data-qty="${id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${q}</span><button data-qty="${id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><span class="line-price">${money(p.price*q)}</span></div>`}).join(""):`<p class="empty-cart">Your bag is taking a breather.<br>Add something thoughtful from the collection.</p>`}
function add(id){state.cart[id]=(state.cart[id]||0)+1;renderCart();openDrawer()}
function openDrawer(){closeModals();$("#overlay").hidden=false;$("#cart-drawer").classList.add("open");$("#cart-drawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeDrawer(){ $("#cart-drawer").classList.remove("open");$("#cart-drawer").setAttribute("aria-hidden","true");if(!document.querySelector(".modal:not([hidden])")){$("#overlay").hidden=true;document.body.style.overflow=""}}
function closeModals(){document.querySelectorAll(".modal").forEach(m=>m.hidden=true);closeDrawer();$("#overlay").hidden=true;document.body.style.overflow=""}
function openModal(id){closeDrawer();$("#overlay").hidden=false;$(id).hidden=false;document.body.style.overflow="hidden"}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(b.dataset.add)});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;state.category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.category===state.category));renderProducts()});
document.querySelectorAll(".collection-card").forEach(b=>b.addEventListener("click",()=>{state.category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.category===state.category));renderProducts();$("#shop").scrollIntoView({behavior:"smooth"})}));
$("#product-search").addEventListener("input",e=>{state.query=e.target.value;renderProducts()});
$("#sort-products").addEventListener("change",e=>{state.sort=e.target.value;renderProducts()});
$("#search-focus").addEventListener("click",()=>{$("#product-search").focus();$("#shop").scrollIntoView({behavior:"smooth"})});
$("#cart-open").addEventListener("click",()=>{renderCart();openDrawer()});
$("#cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=b.dataset.qty;state.cart[id]=Math.max(0,(state.cart[id]||0)+Number(b.dataset.delta));if(!state.cart[id])delete state.cart[id];renderCart()});
$("#checkout-open").addEventListener("click",()=>{if(!cartQty()){alert("Your bag is empty — add a product first.");return}openModal("#checkout-modal");$("#checkout-result").hidden=true});
$("#checkout-form").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.currentTarget);const first=(data.get("name")||"there").toString().trim().split(/\s+/)[0].replace(/[<>]/g,"");const ref="NOVA-DEMO-"+Math.random().toString(36).slice(2,8).toUpperCase();$("#checkout-result").hidden=false;$("#checkout-result").textContent=`Thanks, ${first || "there"} — demo order ${ref} has been simulated for ${money(cartTotal())}. No order was sent to a server and no payment was taken.`;state.cart={};renderCart();e.currentTarget.reset()});
$("#account-open").addEventListener("click",()=>{openModal("#account-modal");$("#account-result").hidden=true});
$("#account-form").addEventListener("submit",e=>{e.preventDefault();const username=new FormData(e.currentTarget).get("username").toString().replace(/[<>]/g,"");$("#account-result").hidden=false;$("#account-result").textContent=`Local sign-in simulation complete for “${username}”. No password was stored or sent anywhere. A real store needs server-side authentication, secure sessions, and password hashing.`;e.currentTarget.reset()});
$("#lab-open").addEventListener("click",()=>openModal("#lab-modal"));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeModals));
$("#overlay").addEventListener("click",closeModals);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModals()});
document.querySelectorAll(".lab-tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".lab-tab").forEach(t=>t.classList.toggle("active",t===b));document.querySelectorAll(".lab-panel").forEach(p=>p.hidden=true);$("#lab-"+b.dataset.lab).hidden=false}));
document.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>{$("#requests-feedback").textContent=b.dataset.answer==="headers"?"Correct. Inspect request method, URL parameters, headers, cookies, and response behavior in your own authorised test environment.":"Not quite. Focus on understanding request components and testing only authorised systems.";$("#requests-feedback").style.color=b.dataset.answer==="headers"?"#506b3d":"#a34d37"}));
$("#input-test").addEventListener("click",()=>{$("#safe-output").textContent=$("#lab-string").value||"No input entered.";});
document.querySelectorAll("[data-access]").forEach(b=>b.addEventListener("click",()=>{$("#access-feedback").textContent=b.dataset.access==="deny"?"Correct. The customer does not own this order, so access should be denied and logged by the server.":"Incorrect. Allowing this would risk insecure direct object reference (IDOR / broken object-level authorisation).";$("#access-feedback").style.color=b.dataset.access==="deny"?"#506b3d":"#a34d37"}));
renderProducts();renderCart();
