async function fetchStatus() {
  try {
    const response = await fetch('https://api.lanyard.rest/v1/users/491473057538506763');
    const result = await response.json();
    console.log(result);

    if (result && result.data && result.data.discord_user) {
      document.getElementById("username").innerHTML = result.data.discord_user.global_name;
    } else {
      document.getElementById("username").innerHTML = "User data not found";
    }
  } catch (error) {
    console.error('Error fetching status:', error);
    document.getElementById("username").innerHTML = "Error loading user";
  }
}