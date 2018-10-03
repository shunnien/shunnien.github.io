title: Asp.Net MVC 5 Identity 使用 DataBaseFirst
categories: 程式技術筆記
tags:
  - Asp.Net MVC
toc: false
date: 2017-08-10 11:45:57
description:
---

直接進入主題，此次要使用 **DataBase First** 來使用 **[Identity][3]** ，所以先使用範本建立 MVC 專案，另外不要使用 **Authentication** <!-- more -->。
![create project](https://lh3.googleusercontent.com/EsLYwWTVTW_La1If-yyxC7bsE_9sSFFREIDk1p-a7pnUx0OVSmThbyCPc14QFRgtQ2Fbz1osJrsPDKnVwQ9MhhNBpNWMKHLOL-QESSCjhIZXZdRlZ-7H1hU6xF6LM6f6gYpcbSehITOYcKKgaosf7xsfOPwxc0sJ21yh-xNksPvUh5ymVHtPDjGtNa9RFsoWTNUjRSbhoa_wA-8igN4wsoHfywUeld0mr39iTEQ-ZdzEekMuEV_DCxeSp-f7ynshawecOroNP0G9rA776arcQRmtb2auom_rLiyq1MHf5UzyLppsZmtRQj2tGr1ELzF05f9CZZ5s9VtkvlYChQiLOrQhgauVKXjUoK0s7H0eCKW5A4-asHdgeHY5KnxCbpf1I-0FkpW9TQRY4VzL8RNvKxOsxBUc3rynN-_KZv2bnTojpOakbQ0-r2bKMeDIEGgpV8gV5oQ5g-i1AVp4clGPobx0tDcGgDy7_F4ZwH6RSJyPdF5OqHqf96jxoakxu4DRicssEgrtkwAWw12z4nB0SIKECqWh-Mj47cIwTub91m-ZLGdQZjVrx-EitYqja3YFRYtDAtujslfp4zLd_jBGhMC_ckfnyT_nEllzwE5oqIaiflKAKVFBvjnXeoZWA1Q8smMYenJJYqyzP17IVTL22qjqqOMI8MuNW1ebftSCuxiDRQ=w977-h659-no)

## 套件安裝
專案建立好之後，手動安裝 **[Identity][3]** 套件，可以透過 **[Nuget][4]** 安裝以下這三個套件
- Microsoft.AspNet.Identity.Core
``` bash
Install-Package Microsoft.AspNet.Identity.Core
```
- Microsoft.AspNet.Identity.EntityFramework
``` bash
Install-Package Microsoft.AspNet.Identity.EntityFramework
```
- Microsoft.AspNet.Identity.Owin
``` bash
Install-Package Microsoft.AspNet.Identity.Owin
```
![Identity Packages](https://lh3.googleusercontent.com/nXm1bwaXZARhopxY3GAAvCjG4G1Jpaeh7TeoiqgOPLxwAd08694cx0p2gsiK8YbY274o5tmFGLOZ_mKxeJOm8aOcmgt8K8v7ut1NDJN2D0rpYfFVVTompnVFWfXrMFm_nHPnei13cGXDK1XymcgOQ-tFjgUkpPrJY3_XwUeISvht-jOI6MKsCWaIh8ciATYxKkh3CgOGnKjIxSpQnfGIp9LHKBxX-zY303ne--JszherW1srGzrZVD3I7lFwn7sEYodaTIfVFvYG0OE0JdGgV7DYti51F9y-eMwA7SBysHfrQrfwdRjkYREouD1C0X_eB_U3XPMoT2m_hbjXXHhuLHQvumrvx9uL9cTpg0tJ0v3lK1-FMfXHRw47a1qLZfCWDrI8ZvH5tZ1ac4oIuf0-98CV1sVt5N-2F3ZWxUFCAUmPXpmMJ8-SVkqf6NCCMiDDHSNJWSevRWgu-vsmW-LESx5mls7qq9K692VT4D14IFAafyZpy0dKZUAuRIklQmu_bLT3a_MdCFIB6R5SX0I2deMk0ZYAM6m0OKqaaPwjD5ty2C8KxyOP5crD9DxcaXRnDudhWnKJdPdC-p4JBW6uwwBLSGTAaeRryGIhylt-zis8Nip7nLJzxIl7-eJyO_t_xmTnQeDyB--CRV5fpFDYdX-nBCRcoQ2bI7RPIB5m1EkvDA=w1194-h132-no)

另外此次範例使用 **Owin**，需要安裝 **Microsoft.Owin** 套件，這套件有許多相依套件，裝完後會有
- Microsoft.Owin
- Microsoft.Owin.Security
- Microsoft.Owin.Security.Cookies
- Microsoft.Owin.Security.OAuth

安裝方式可以透過 [Nuget Manager Console](https://docs.microsoft.com/en-us/nuget/tools/package-manager-console)
``` bash
Install-Package Microsoft.Owin
```

還有 **Microsoft.Owin.Host.SystemWeb** 需要安裝
``` bash
Install-Package Microsoft.Owin.Host.SystemWeb
```

最後，因為部分語法使用 **[C# 7.0](https://blogs.msdn.microsoft.com/msdntaiwan/2017/04/10/c7-new-features/)** ，此範例使用 **.net framework 4.6** 如果沒有安裝 Package 在編譯的時候反而會出錯，所以安裝以下套件
``` bash
Install-Package Microsoft.Net.Compilers
```

## 建立資料與對應

可以使用以下的 script 建立
套件處理完成，接著需要先建立資料表，以下是預設的 **[Identity][3]** 資料表，欄位盡量**不要變動**，可以**增加新的欄位**，或是變動 Id 索引的類型，此範例就變更 Id 類型為 int

``` sql
-- 切換至資料庫
USE YourDataBaseName
GO
ALTER TABLE [dbo].[IdentityUserRoles] DROP CONSTRAINT [FK_IdentityUserRoles_IdentityUsers_UserId]
GO
ALTER TABLE [dbo].[IdentityUserRoles] DROP CONSTRAINT [FK_IdentityUserRoles_IdentityRoles_RoleId]
GO
ALTER TABLE [dbo].[IdentityUserLogins] DROP CONSTRAINT [FK_IdentityUserLogins_IdentityUsers_UserId]
GO
ALTER TABLE [dbo].[IdentityUserClaims] DROP CONSTRAINT [FK_IdentityUserClaims_IdentityUsers_UserId]
GO

/****** Drop Identity Tables ******/
DROP TABLE [dbo].[IdentityUsers]
GO
DROP TABLE [dbo].[IdentityUserRoles]
GO
DROP TABLE [dbo].[IdentityUserLogins]
GO
DROP TABLE [dbo].[IdentityUserClaims]
GO
DROP TABLE [dbo].[IdentityRoles]
GO

/****** Object:  Table [dbo].[IdentityRoles] ******/
CREATE TABLE [dbo].[IdentityRoles](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](256) NOT NULL,
    CONSTRAINT [PK_IdentityRoles] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

/****** Object:  Table [dbo].[IdentityUserClaims] ******/
CREATE TABLE [dbo].[IdentityUserClaims](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [UserId] [int] NOT NULL,
    [ClaimType] [nvarchar](max) NULL,
    [ClaimValue] [nvarchar](max) NULL,
    CONSTRAINT [PK_IdentityUserClaims] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

/****** Object:  Table [dbo].[IdentityUserLogins] ******/
CREATE TABLE [dbo].[IdentityUserLogins](
    [LoginProvider] [nvarchar](128) NOT NULL,
    [ProviderKey] [nvarchar](128) NOT NULL,
    [UserId] [int] NOT NULL,
    CONSTRAINT [PK_IdentityUserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC,[ProviderKey] ASC,[UserId] ASC)
);
GO

/****** Object:  Table [dbo].[IdentityUsers] ******/
CREATE TABLE [dbo].[IdentityUsers](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Email] [nvarchar](256) NULL,
    [EmailConfirmed] [bit] NOT NULL,
    [PasswordHash] [nvarchar](100) NULL,
    [SecurityStamp] [nvarchar](100) NULL,
    [PhoneNumber] [nvarchar](25) NULL,
    [PhoneNumberConfirmed] [bit] NOT NULL,
    [TwoFactorEnabled] [bit] NOT NULL,
    [LockoutEndDateUtc] [datetime] NULL,
    [LockoutEnabled] [bit] NOT NULL,
    [AccessFailedCount] [int] NOT NULL,
    [UserName] [nvarchar](256) NOT NULL,
    CONSTRAINT [PK_IdentityUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

/****** Object:  Table [dbo].[IdentityUserRoles] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IdentityUserRoles](
    [UserId] [int] NOT NULL,
    [RoleId] [int] NOT NULL,
    CONSTRAINT [PK_IdentityUserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC,[RoleID] ASC)
);
GO

ALTER TABLE [dbo].[IdentityUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserClaims_IdentityUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[IdentityUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[IdentityUserClaims] CHECK CONSTRAINT [FK_IdentityUserClaims_IdentityUsers_UserId]
GO

ALTER TABLE [dbo].[IdentityUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserLogins_IdentityUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[IdentityUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[IdentityUserLogins] CHECK CONSTRAINT [FK_IdentityUserLogins_IdentityUsers_UserId]
GO

ALTER TABLE [dbo].[IdentityUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserRoles_IdentityRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[IdentityRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[IdentityUserRoles] CHECK CONSTRAINT [FK_IdentityUserRoles_IdentityRoles_RoleId]
GO

ALTER TABLE [dbo].[IdentityUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_IdentityUserRoles_IdentityUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[IdentityUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[IdentityUserRoles] CHECK CONSTRAINT [FK_IdentityUserRoles_IdentityUsers_UserId]
GO
```

資料表建立完成，即可以使用 **Entity Framework** 來建立 **edmx** 。

## [Identity][3] 與 **edmx** 對應
因為 edmx 產生了資料表對應的 Class ，但是 [Identity][3] 不知道對應哪個，所以透過 **partial class** 繼承 **IUser** 與 **IRole**

``` cs
    /// <summary>
    /// edmx IdentityUser 資料表類別對應 Identity 套件的使用者資料
    /// </summary>
    /// <seealso cref="int" />
    public partial class IdentityUser: IUser<int>
    {
        /// <summary>
        /// 非同步產生使用者驗證
        /// </summary>
        /// <param name="manager">Identity 的 UserManager</param>
        /// <returns>Task&lt;ClaimsIdentity&gt;.</returns>
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<IdentityUser, int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    /// <summary>
    /// edmx IdentityRole 資料表類別對應 Identity 套件的角色資料
    /// </summary>
    /// <seealso cref="int" />
    public partial class IdentityRole : IRole<int>
    {
    }
```

接著必須對以下這些介面進行實作，主要是需要指定 **DbContext**
- IQueryableUserStore<IdentityUser, int>
- IUserPasswordStore<IdentityUser, int>
- IUserLoginStore<IdentityUser, int>
- IUserClaimStore<IdentityUser, int>
- IUserRoleStore<IdentityUser, int>
- IUserSecurityStampStore<IdentityUser, int>
- IUserEmailStore<IdentityUser, int>
- IUserPhoneNumberStore<IdentityUser, int>
- IUserTwoFactorStore<IdentityUser, int>
- IUserLockoutStore<IdentityUser, int>
- IQueryableRoleStore<IdentityRole, int>

直接建立 **UserSotre Class** 與 **RoleStore Class** 來實作；以下為 **UserStore Class**
``` cs
    public class UserStore :
        IQueryableUserStore<IdentityUser, int>, IUserPasswordStore<IdentityUser, int>, IUserLoginStore<IdentityUser, int>,
        IUserClaimStore<IdentityUser, int>, IUserRoleStore<IdentityUser, int>, IUserSecurityStampStore<IdentityUser, int>,
        IUserEmailStore<IdentityUser, int>, IUserPhoneNumberStore<IdentityUser, int>, IUserTwoFactorStore<IdentityUser, int>,
        IUserLockoutStore<IdentityUser, int>
    {
        /// <summary>
        /// The database
        /// </summary>
        private readonly DataEntities db;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserStore"/> class.
        /// </summary>
        /// <param name="db">The database.</param>
        /// <exception cref="ArgumentNullException">db</exception>
        public UserStore(DataEntities db)
        {
            this.db = db ?? throw new ArgumentNullException(nameof(db));
        }

        #region -- IQueryableUserStore<IdentityUser, int> --

        /// <inheritdoc />
        /// <summary>
        /// IQueryable users
        /// </summary>
        /// <value>The users.</value>
        public IQueryable<IdentityUser> Users => this.db.IdentityUsers;

        #endregion

        #region -- IUserStore<IdentityUser, Key> --

        /// <inheritdoc />
        /// <summary>
        /// Insert a new user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task.</returns>
        public Task CreateAsync(IdentityUser user)
        {
            this.db.IdentityUsers.Add(user);
            return this.db.SaveChangesAsync();
        }

        /// <inheritdoc />
        /// <summary>
        /// Delete a user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task.</returns>
        public Task DeleteAsync(IdentityUser user)
        {
            this.db.IdentityUsers.Remove(user);
            return this.db.SaveChangesAsync();
        }

        /// <summary>
        /// Finds a user
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>Task&lt;IdentityUser&gt;.</returns>
        public Task<IdentityUser> FindByIdAsync(int userId)
        {
            return this.db.IdentityUsers
                .Include(u => u.IdentityUserLogins).Include(u => u.IdentityRoles).Include(u => u.IdentityUserClaims)
                .FirstOrDefaultAsync(u => u.Id.Equals(userId));
        }

        /// <summary>
        /// Find a user by name
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns>Task&lt;IdentityUser&gt;.</returns>
        public Task<IdentityUser> FindByNameAsync(string userName)
        {
            return this.db.IdentityUsers
                .Include(u => u.IdentityUserLogins).Include(u => u.IdentityRoles).Include(u => u.IdentityUserClaims)
                .FirstOrDefaultAsync(u => u.UserName == userName);
        }

        /// <summary>
        /// Update a user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task.</returns>
        public Task UpdateAsync(IdentityUser user)
        {
            this.db.Entry<IdentityUser>(user).State = EntityState.Modified;
            return this.db.SaveChangesAsync();
        }

        #endregion

        #region -- IUserPasswordStore<IdentityUser, Key> --

        /// <summary>
        /// Get the user password hash
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.String&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<string> GetPasswordHashAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.PasswordHash);
        }

        /// <summary>
        /// Returns true if a user has a password set
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        public Task<bool> HasPasswordAsync(IdentityUser user)
        {
            return Task.FromResult(user.PasswordHash != null);
        }

        /// <summary>
        /// Set the user password hash
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="passwordHash">The password hash.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetPasswordHashAsync(IdentityUser user, string passwordHash)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserLoginStore<IdentityUser, Key> --

        /// <summary>
        /// Adds a user login with the specified provider and key
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="login">The login.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">
        /// user
        /// or
        /// login
        /// </exception>
        public Task AddLoginAsync(IdentityUser user, UserLoginInfo login)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (login == null)
            {
                throw new ArgumentNullException(nameof(login));
            }

            var userLogin = Activator.CreateInstance<IdentityUserLogin>();
            userLogin.UserId = user.Id;
            userLogin.LoginProvider = login.LoginProvider;
            userLogin.ProviderKey = login.ProviderKey;
            user.IdentityUserLogins.Add(userLogin);
            return Task.FromResult(0);
        }

        /// <summary>
        /// find as an asynchronous operation.
        /// </summary>
        /// <param name="login">The login.</param>
        /// <returns>Task&lt;IdentityUser&gt;.</returns>
        /// <exception cref="ArgumentNullException">login</exception>
        public async Task<IdentityUser> FindAsync(UserLoginInfo login)
        {
            if (login == null)
            {
                throw new ArgumentNullException(nameof(login));
            }

            var provider = login.LoginProvider;
            var key = login.ProviderKey;

            var userLogin = await this.db.IdentityUserLogins.FirstOrDefaultAsync(l => l.LoginProvider == provider && l.ProviderKey == key);

            if (userLogin == null)
            {
                return default(IdentityUser);
            }

            return await this.db.IdentityUsers
                .Include(u => u.IdentityUserLogins).Include(u => u.IdentityRoles).Include(u => u.IdentityUserClaims)
                .FirstOrDefaultAsync(u => u.Id.Equals(userLogin.UserId));
        }

        /// <summary>
        /// Returns the linked accounts for this user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;IList&lt;UserLoginInfo&gt;&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<IList<UserLoginInfo>> GetLoginsAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult<IList<UserLoginInfo>>(user.IdentityUserLogins.Select(l => new UserLoginInfo(l.LoginProvider, l.ProviderKey)).ToList());
        }

        /// <summary>
        /// Removes the user login with the specified combination if it exists
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="login">The login.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">
        /// user
        /// or
        /// login
        /// </exception>
        public Task RemoveLoginAsync(IdentityUser user, UserLoginInfo login)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (login == null)
            {
                throw new ArgumentNullException(nameof(login));
            }

            var provider = login.LoginProvider;
            var key = login.ProviderKey;

            var item = user.IdentityUserLogins.SingleOrDefault(l => l.LoginProvider == provider && l.ProviderKey == key);

            if (item != null)
            {
                user.IdentityUserLogins.Remove(item);
            }

            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserClaimStore<IdentityUser, int> --

        /// <summary>
        /// Add a new user claim
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="claim">The claim.</param>
        /// <returns>Task.</returns>
        /// <exception cref="System.ArgumentNullException">
        /// user
        /// or
        /// claim
        /// </exception>
        public Task AddClaimAsync(IdentityUser user, Claim claim)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim));
            }

            var item = Activator.CreateInstance<IdentityUserClaim>();
            item.UserId = user.Id;
            item.ClaimType = claim.Type;
            item.ClaimValue = claim.Value;
            user.IdentityUserClaims.Add(item);
            return Task.FromResult(0);
        }

        /// <summary>
        /// Returns the claims for the user with the issuer set
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;IList&lt;Claim&gt;&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<IList<Claim>> GetClaimsAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult<IList<Claim>>(user.IdentityUserClaims.Select(c => new Claim(c.ClaimType, c.ClaimValue)).ToList());
        }

        /// <summary>
        /// Remove a user claim
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="claim">The claim.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">
        /// user
        /// or
        /// claim
        /// </exception>
        public Task RemoveClaimAsync(IdentityUser user, Claim claim)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim));
            }

            foreach (var item in user.IdentityUserClaims.Where(uc => uc.ClaimValue == claim.Value && uc.ClaimType == claim.Type).ToList())
            {
                user.IdentityUserClaims.Remove(item);
            }

            foreach (var item in this.db.IdentityUserClaims.Where(uc => uc.UserId.Equals(user.Id) && uc.ClaimValue == claim.Value && uc.ClaimType == claim.Type).ToList())
            {
                this.db.IdentityUserClaims.Remove(item);
            }

            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserRoleStore<IdentityUser, int> --

        /// <summary>
        /// Adds a user to a role
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="roleName">Name of the role.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        /// <exception cref="ArgumentException">roleName</exception>
        /// <exception cref="InvalidOperationException"></exception>
        public Task AddToRoleAsync(IdentityUser user, string roleName)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException(WarningStr.ValueCannotBeNullOrEmpty, nameof(roleName));
            }

            var userRole = this.db.IdentityRoles.SingleOrDefault(r => r.Name == roleName);

            if (userRole == null)
            {
                throw new InvalidOperationException(string.Format(CultureInfo.CurrentCulture, WarningStr.RoleNotFound, new object[] { roleName }));
            }

            user.IdentityRoles.Add(userRole);
            return Task.FromResult(0);
        }

        /// <summary>
        /// Returns the roles for this user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;IList&lt;System.String&gt;&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<IList<string>> GetRolesAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult<IList<string>>(user.IdentityRoles.Join(this.db.IdentityRoles, ur => ur.Id, r => r.Id, (ur, r) => r.Name).ToList());
        }

        /// <summary>
        /// Returns true if a user is in the role
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="roleName">Name of the role.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        /// <exception cref="ArgumentException">roleName</exception>
        public Task<bool> IsInRoleAsync(IdentityUser user, string roleName)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException(WarningStr.ValueCannotBeNullOrEmpty, nameof(roleName));
            }

            return
                Task.FromResult<bool>(
                    this.db.IdentityRoles.Any(r => r.Name == roleName && r.IdentityUsers.Any(u => u.Id.Equals(user.Id))));
        }

        /// <summary>
        /// Removes the role for the user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="roleName">Name of the role.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        /// <exception cref="ArgumentException">roleName</exception>
        public Task RemoveFromRoleAsync(IdentityUser user, string roleName)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException(WarningStr.ValueCannotBeNullOrEmpty, nameof(roleName));
            }

            var userRole = user.IdentityRoles.SingleOrDefault(r => r.Name == roleName);

            if (userRole != null)
            {
                user.IdentityRoles.Remove(userRole);
            }

            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserSecurityStampStore<IdentityUser, int> --

        /// <summary>
        /// Get the user security stamp
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.String&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<string> GetSecurityStampAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.SecurityStamp);
        }

        /// <summary>
        /// Set the security stamp for the user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="stamp">The stamp.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetSecurityStampAsync(IdentityUser user, string stamp)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.SecurityStamp = stamp;
            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserEmailStore<IdentityUser, int> --

        /// <summary>
        /// Returns the user associated with this email
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns>Task&lt;IdentityUser&gt;.</returns>
        public Task<IdentityUser> FindByEmailAsync(string email)
        {
            return this.db.IdentityUsers
                .Include(u => u.IdentityUserLogins).Include(u => u.IdentityRoles).Include(u => u.IdentityUserClaims)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        /// <summary>
        /// Get the user email
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.String&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<string> GetEmailAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.Email);
        }

        /// <summary>
        /// Returns true if the user email is confirmed
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<bool> GetEmailConfirmedAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.EmailConfirmed);
        }

        /// <summary>
        /// Set the user email
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="email">The email.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetEmailAsync(IdentityUser user, string email)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.Email = email;
            return Task.FromResult(0);
        }

        /// <summary>
        /// Sets whether the user email is confirmed
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="confirmed">if set to <c>true</c> [confirmed].</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetEmailConfirmedAsync(IdentityUser user, bool confirmed)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.EmailConfirmed = confirmed;
            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserPhoneNumberStore<IdentityUser, int> --

        /// <summary>
        /// Get the user phone number
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.String&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<string> GetPhoneNumberAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.PhoneNumber);
        }

        /// <summary>
        /// Returns true if the user phone number is confirmed
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<bool> GetPhoneNumberConfirmedAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.PhoneNumberConfirmed);
        }

        /// <summary>
        /// Set the user's phone number
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="phoneNumber">The phone number.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetPhoneNumberAsync(IdentityUser user, string phoneNumber)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.PhoneNumber = phoneNumber;
            return Task.FromResult(0);
        }

        /// <summary>
        /// Sets whether the user phone number is confirmed
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="confirmed">if set to <c>true</c> [confirmed].</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetPhoneNumberConfirmedAsync(IdentityUser user, bool confirmed)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.PhoneNumberConfirmed = confirmed;
            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserTwoFactorStore<IdentityUser, int> --

        /// <summary>
        /// Returns whether two factor authentication is enabled for the user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<bool> GetTwoFactorEnabledAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.TwoFactorEnabled);
        }

        /// <summary>
        /// Sets whether two factor authentication is enabled for the user
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="enabled">if set to <c>true</c> [enabled].</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetTwoFactorEnabledAsync(IdentityUser user, bool enabled)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.TwoFactorEnabled = enabled;
            return Task.FromResult(0);
        }

        #endregion

        #region -- IUserLockoutStore<IdentityUser, int> --

        /// <summary>
        /// Returns the current number of failed access attempts.  This number usually will be reset whenever the password is
        /// verified or the account is locked out.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Int32&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<int> GetAccessFailedCountAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.AccessFailedCount);
        }

        /// <summary>
        /// Returns whether the user can be locked out.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<bool> GetLockoutEnabledAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.LockoutEnabled);
        }

        /// <summary>
        /// Returns the DateTimeOffset that represents the end of a user's lockout, any time in the past should be considered
        /// not locked out.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;DateTimeOffset&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<DateTimeOffset> GetLockoutEndDateAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(
                user.LockoutEndDateUtc.HasValue ?
                    new DateTimeOffset(DateTime.SpecifyKind(user.LockoutEndDateUtc.Value, DateTimeKind.Utc)) :
                    new DateTimeOffset());
        }

        /// <summary>
        /// Used to record when an attempt to access the user has failed
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task&lt;System.Int32&gt;.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task<int> IncrementAccessFailedCountAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.AccessFailedCount++;
            return Task.FromResult(user.AccessFailedCount);
        }

        /// <summary>
        /// Used to reset the access failed count, typically after the account is successfully accessed
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task ResetAccessFailedCountAsync(IdentityUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.AccessFailedCount = 0;
            return Task.FromResult(0);
        }

        /// <summary>
        /// Sets whether the user can be locked out.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="enabled">if set to <c>true</c> [enabled].</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetLockoutEnabledAsync(IdentityUser user, bool enabled)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.LockoutEnabled = enabled;
            return Task.FromResult(0);
        }

        /// <summary>
        /// Locks a user out until the specified end date (set to a past date, to unlock a user)
        /// </summary>
        /// <param name="user">The user.</param>
        /// <param name="lockoutEnd">The lockout end.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">user</exception>
        public Task SetLockoutEndDateAsync(IdentityUser user, DateTimeOffset lockoutEnd)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.LockoutEndDateUtc = lockoutEnd == DateTimeOffset.MinValue ? null : new DateTime?(lockoutEnd.UtcDateTime);
            return Task.FromResult(0);
        }

        #endregion

        #region -- IDisposable --

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                db?.Dispose();
            }
        }

        #endregion
    }
```

以下為 **RoleStore Class**

``` csharp
    /// <summary>
    /// Class RoleStore.
    /// </summary>
    public class RoleStore : IQueryableRoleStore<IdentityRole, int>
    {
        /// <summary>
        /// The database
        /// </summary>
        private readonly DataEntities db;

        /// <summary>
        /// Initializes a new instance of the <see cref="RoleStore"/> class.
        /// </summary>
        /// <param name="db">The database.</param>
        public RoleStore(DataEntities db)
        {
            this.db = db;
        }

        #region -- IQueryableRoleStore<UserRole, TKey> --

        /// <summary>
        /// IQueryable Roles
        /// </summary>
        /// <value>The roles.</value>
        public IQueryable<IdentityRole> Roles
        {
            get { return this.db.IdentityRoles; }
        }

        #endregion

        #region -- IRoleStore<UserRole, TKey> --

        /// <summary>
        /// Create a new role
        /// </summary>
        /// <param name="role">The role.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">role</exception>
        public virtual Task CreateAsync(IdentityRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }
            this.db.IdentityRoles.Add(role);
            return this.db.SaveChangesAsync();
        }

        /// <summary>
        /// Delete a role
        /// </summary>
        /// <param name="role">The role.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">role</exception>
        public Task DeleteAsync(IdentityRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            this.db.IdentityRoles.Remove(role);
            return this.db.SaveChangesAsync();
        }

        /// <summary>
        /// Find a role by id
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <returns>Task&lt;IdentityRole&gt;.</returns>
        public Task<IdentityRole> FindByIdAsync(int roleId)
        {
            return this.db.IdentityRoles.FindAsync(new[] { roleId });
        }

        /// <summary>
        /// Find a role by name
        /// </summary>
        /// <param name="roleName">Name of the role.</param>
        /// <returns>Task&lt;IdentityRole&gt;.</returns>
        public Task<IdentityRole> FindByNameAsync(string roleName)
        {
            return this.db.IdentityRoles.FirstOrDefaultAsync(r => r.Name == roleName);
        }

        /// <summary>
        /// Update a role
        /// </summary>
        /// <param name="role">The role.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">role</exception>
        public Task UpdateAsync(IdentityRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            this.db.Entry(role).State = EntityState.Modified;
            return this.db.SaveChangesAsync();
        }

        #endregion

        #region -- IDisposable --

        /// <inheritdoc />
        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                db?.Dispose();
            }
        }

        #endregion
    }
```

## [Identity][3] Configuration
對應完成後，在 **Startup.Auth** 檔案進行註冊即可
``` csharp
    public partial class Startup
    {
        /// <summary>
        /// Configures the authentication.
        /// </summary>
        /// <param name="app">The application.</param>
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context, user manager and role manager to use a single instance per request
            app.CreatePerOwinContext(()=> new DataEntities());
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);
            // ... 省略以下
        }
    }
```

接下來的步驟就跟一般 **Code First** 相同，只是手動安裝套件的話，這些 **Controller** 與 **IdentityConfig** 都需要自行實作，可以參考此次[範例檔案][2]。


## 參考資料
- [kriasoft AspNet.Identity][1]

[1]: https://github.com/kriasoft/AspNet.Identity
[2]: https://github.com/shunnien/ASPNetMVC/tree/develop
[3]: https://www.asp.net/identity
[4]: https://www.nuget.org/