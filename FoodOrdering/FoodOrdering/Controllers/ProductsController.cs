using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FoodOrdering.Models;

namespace FoodOrdering.Controllers
{
    public class ProductsController : Controller
    {
        private FoodOrderingDbEntities db = new FoodOrderingDbEntities();

        // GET: Products
        public ActionResult Index()
        {
            return null;
        }

        //---------------ACTIONS------------------

        [HttpGet]
        public JsonResult GetAllProducts()
        {
            var allproducts = (from eachproduct in db.Products
                               select eachproduct).ToList();
            return Json(allproducts, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetCategoryProduct(Product productCategory)
        {
            var productsUnderCategory = (from eachproduct in db.Products
                                         where eachproduct.Category.Equals(productCategory.Category)
                                         select eachproduct).ToList();
            return Json(productsUnderCategory);
        }

        [HttpPost]
        public JsonResult SearchProduct(Product product)
        {
            var searchProductDb = db.Products
                                    .Where(P => P.Name.Equals(product.Name, StringComparison.InvariantCultureIgnoreCase))
                                    .FirstOrDefaultAsync();
            if (searchProductDb != null)
                return Json(searchProductDb);
            else
                return Json(product.Name + " not found!");
        }

        [HttpPost]
        public JsonResult GetOffers(Product product)
        {
            var eachOffer = (from offers in db.Products
                             where offers.Offer == true
                             select offers).ToList();
            return Json(eachOffer);
        }
        [HttpPost]
        public JsonResult AddProductToCart(Product product)
        {
            var searchProductDb = db.Products
                                    .Where(P => P.Name.Equals(product.Name)
                                    || P.ProductId == product.ProductId)
                                    .FirstOrDefault();
            if (searchProductDb != null)
            {
                string sqlInsert = "EXEC upsertCarts "
                                    + "sky"
                                    + "," + product.ProductId;
                db.Database.ExecuteSqlCommand(sqlInsert);
                return Json("ADDED!");
            }
            else
                return Json("ERROR!");
        }

        // GET: Products/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ProductId,Name,Category,Price,Offer")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ProductId,Name,Category,Price,Offer")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}