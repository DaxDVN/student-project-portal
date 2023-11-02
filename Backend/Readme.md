1. **CONFIG APPLICATION.PROPERTIES**
   - Connect to database
       ```
      spring.datasource.url=jdbc:mysql://localhost:3306/student_project_portal
      spring.datasource.username=
      spring.datasource.password=
      ```   
   - Config JPA
       ```
      spring.jpa.hibernate.ddl-auto=update
      spring.jpa.properties.hibernate.show_sql=true
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
      ```   
   - Config for sending email
       ```
      spring.mail.host=smtp.gmail.com
      spring.mail.port=587
      spring.mail.username=daxnguyen.dvn7723@gmail.com
      spring.mail.password=xmjt nrby xqcs zvsg
      spring.mail.properties.mail.smtp.auth=true
      spring.mail.properties.mail.smtp.starttls.enable=true
      ```   
   - #Add JWT Signature
      ```
      app-jwt-secret=fc5aed6000f289746a317a3b860de042278c46aa9c184ae0376c017b4888009e
      app-jwt-expiration-milliseconds=3600000
      ```
2. **HTTP STATUS**
    ```
    - 200: OK -> Done Successfully
    - 201: CREATED -> Created Successfully
    - 404: NOT FOUND -> Resource not found
    - 409: CONFLICT -> Conflict when create which already exist
    - 408: REQUEST TIME OUT -> Too long for waiting
    ```
