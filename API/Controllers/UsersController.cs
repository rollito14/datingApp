using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers;
[Authorize]
public class UsersController : BaseApiController
{
 private readonly DataContext _context;

 public UsersController(DataContext context)
 {
  _context = context;
 }   
 [AllowAnonymous]
 [HttpGet]
 public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
 {
  var users= await _context.Users.ToListAsync();
  return users;
 }

 [HttpGet("{id}")]
 public ActionResult<AppUser> GetUser(int id)
 {
  var user= _context.Users.Find(id);
  return user;
 }
}