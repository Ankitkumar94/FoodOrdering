using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodOrdering.Models;

namespace FoodOrdering.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return File("~/Views/Home/blank.html", "text/html");
        }

        public ActionResult Index1()
        {
            return File("~/Views/Home/index.html", "text/html");
        }

        [HttpPost]
        public JsonResult ClientLogin (Client d)
        {
            using (FoodOrderingDbEntities dc = new FoodOrderingDbEntities())
            {
                var user = dc.Clients.Where(a => a.ClientId.Equals(d.ClientId) && a.Password.Equals(d.Password)).FirstOrDefault();
                return Json(user.ClientId);

                //if (user != null)
                //{
                //    return Json("Welcome" + " " + d.ClientId);
                //}
                //else
                //{
                //    return Json("Error! Kindly check credentials");
                //}                
            }
        }

        [HttpPost]
        public JsonResult UserExists(Client c)
        {
            FoodOrderingDbEntities dc = new FoodOrderingDbEntities();

            if (c.ClientId == null || c.ClientId.Equals(" "))
                return Json("");

            var clientId = dc.Clients
                             .Where(a => a.ClientId.Equals(c.ClientId))
                             .FirstOrDefault();
            if (clientId != null)
                return Json("Username Taken!");
            else
                return Json("Username can be used!");
        }

        [HttpPost]
        public JsonResult EmailExists(Client c)
        {
            FoodOrderingDbEntities dc = new FoodOrderingDbEntities();
            var clientEmail = dc.Clients
                                .Where(emailExists => emailExists.Email.Equals(c.Email))
                                .FirstOrDefault();
            if (clientEmail != null)
                return Json("Email ID Exists!");
            else
                return Json("");
        }

        [HttpPost]
        public JsonResult VendorLogin (Vendor d)
        {
            using (FoodOrderingDbEntities dc = new FoodOrderingDbEntities())
            {
                var user = dc.Vendors.Where(a => a.VendorId.Equals(d.VendorId) && a.Password.Equals(d.Password)).FirstOrDefault();
                return Json(user.VendorId);
                                
            }
        }

        [HttpPost]
        public JsonResult ClientPassword (Client d)
        {
            using (FoodOrderingDbEntities dc = new FoodOrderingDbEntities())
            {
                Client user = dc.Clients.Where(a => a.ClientId.Equals(d.ClientId)).FirstOrDefault();
                user.Password = d.Password;
                dc.SaveChanges();
                return Json("Password Changed Successfully !!");
            }
        }

        [HttpPost]
        public JsonResult VendorPassword (Vendor d)
        {
            using (FoodOrderingDbEntities dc = new FoodOrderingDbEntities())
            {
                Vendor user = dc.Vendors.Where(a => a.VendorId.Equals(d.VendorId)).FirstOrDefault();
                user.Password = d.Password;
                dc.SaveChanges();
                return Json("Password Changed Successfully !!");
            }
        }

        [HttpPost]
        public JsonResult DeleteProduct (Product d)
        {
            using (FoodOrderingDbEntities dc = new FoodOrderingDbEntities())
            {
                Product product = dc.Products.Where(a => a.ProductId.Equals(d.ProductId)).FirstOrDefault();
                dc.Products.Remove(product);
                dc.SaveChanges();
                return Json("Product deleted successfully !!");
            }
        }
    }
}