//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FoodOrdering.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order
    {
        public int OrderId { get; set; }
        public Nullable<int> CartId { get; set; }
        public Nullable<int> VendorId { get; set; }
        public Nullable<bool> Payment { get; set; }
        public string Status { get; set; }
    
        public virtual Cart Cart { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}
