using DatingApp.Entities;

namespace DatingApp.Interfaces;

public interface ItokenService
{
    string CreateToken(AppUser user);
}