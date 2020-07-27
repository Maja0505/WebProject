package beans;

import enums.Gender;
import enums.TypeOfUser;

public class Admin extends User {

	public Admin() {
		super();
	}

	public Admin(String username, String password, String firstName, String lastName, Gender gender,
			TypeOfUser typeOfUser) {
		super(username, password, firstName, lastName, gender, typeOfUser);
	}

}
