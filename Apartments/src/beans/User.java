package beans;

import enums.Gender;
import enums.TypeOfUser;

public class User {
	
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Gender gender;
	private TypeOfUser typeOfUser;
	private int flag;
	private Boolean isBlock;
	
	public User() {
	}


	public User(String username, String password, String firstName, String lastName, Gender gender,
			TypeOfUser typeOfUser) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.typeOfUser = typeOfUser;
		this.flag = 0;
		this.isBlock = false;
	}



	public Boolean getIsBlock() {
		return isBlock;
	}


	public void setIsBlock(Boolean isBlock) {
		this.isBlock = isBlock;
	}


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public TypeOfUser getTypeOfUser() {
		return typeOfUser;
	}

	public void setTypeOfUser(TypeOfUser typeOfUser) {
		this.typeOfUser = typeOfUser;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}
	

}
