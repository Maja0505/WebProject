package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.User;

public class UserDAO{

	private HashMap<String, User> users;
	private GenericCRUD<User> genericCRUD = new GenericCRUD<User>();;
	
	public UserDAO(){
		super();
	}
	
	public UserDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException{
		List<User> array = genericCRUD.load(contexPath, User.class);
		users = new HashMap<>();
		for (User user : array) {
			users.put(user.getUsername(), user);
		}
		
	}

	public Collection<User> allUsers(){
		return users.values();
	}
	
	
	public HashMap<String, User> getUsers() {
		return users;
	}

	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}

	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	public void save(Collection<User> allUsers,User newUser) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allUsers);
		users.put(newUser.getUsername(), newUser);
	}
	
}
