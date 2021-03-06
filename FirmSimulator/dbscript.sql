USE [FirmSimulator]
GO
ALTER TABLE [dbo].[Settings] DROP CONSTRAINT [FK_Settings_Users_UserEmail]
GO
ALTER TABLE [dbo].[Scores] DROP CONSTRAINT [FK_Scores_Users_UserEmail]
GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [DF__Users__PasswordH__34C8D9D1]
GO
ALTER TABLE [dbo].[Scores] DROP CONSTRAINT [DF__Scores__TotalPro__6E01572D]
GO
ALTER TABLE [dbo].[Scores] DROP CONSTRAINT [DF__Scores__Settings__5AEE82B9]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 13.12.2016 г. 00:32:15 ******/
DROP TABLE [dbo].[Users]
GO
/****** Object:  Table [dbo].[Settings]    Script Date: 13.12.2016 г. 00:32:15 ******/
DROP TABLE [dbo].[Settings]
GO
/****** Object:  Table [dbo].[Scores]    Script Date: 13.12.2016 г. 00:32:15 ******/
DROP TABLE [dbo].[Scores]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 13.12.2016 г. 00:32:15 ******/
DROP TABLE [dbo].[__EFMigrationsHistory]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 13.12.2016 г. 00:32:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Scores]    Script Date: 13.12.2016 г. 00:32:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Scores](
	[ScoreId] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[ProfitMaximization] [float] NOT NULL,
	[UserEmail] [nvarchar](450) NULL,
	[SettingsDescription] [nvarchar](max) NOT NULL,
	[TotalProfit] [float] NOT NULL,
	[Duration] [nvarchar](max) NULL,
 CONSTRAINT [PK_Scores] PRIMARY KEY CLUSTERED 
(
	[ScoreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Settings]    Script Date: 13.12.2016 г. 00:32:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Settings](
	[SettingsId] [int] IDENTITY(1,1) NOT NULL,
	[Cost_a] [float] NOT NULL,
	[Cost_b] [float] NOT NULL,
	[Cost_c] [float] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Revenue_a] [float] NOT NULL,
	[Revenue_b] [float] NOT NULL,
	[UserEmail] [nvarchar](450) NULL,
 CONSTRAINT [PK_Settings] PRIMARY KEY CLUSTERED 
(
	[SettingsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 13.12.2016 г. 00:32:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Email] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[PasswordHash] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20160929124135_InitialState', N'1.0.1')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20160929171303_ChangedUser', N'1.0.1')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20161004134909_AddedPasswords', N'1.0.1')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20161013212654_ChangedScores', N'1.0.1')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20161026163129_ChangedScoresAgain', N'1.0.1')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20161117173950_ChangedScoresYetAgain', N'1.1.0-rtm-22752')
SET IDENTITY_INSERT [dbo].[Scores] ON 

INSERT [dbo].[Scores] ([ScoreId], [Date], [ProfitMaximization], [UserEmail], [SettingsDescription], [TotalProfit], [Duration]) VALUES (2, CAST(N'2016-10-13T23:44:46.6871167' AS DateTime2), 1, N'aia131@aubg.edu', N'Defaults', 100, N'6 minutes 15 seconds')
INSERT [dbo].[Scores] ([ScoreId], [Date], [ProfitMaximization], [UserEmail], [SettingsDescription], [TotalProfit], [Duration]) VALUES (8, CAST(N'2016-10-19T17:35:10.0000000' AS DateTime2), 0.9, N'jgalletly@aubg.edu', N'Defaults', 80, N'8 minutes 16 seconds')
INSERT [dbo].[Scores] ([ScoreId], [Date], [ProfitMaximization], [UserEmail], [SettingsDescription], [TotalProfit], [Duration]) VALUES (19, CAST(N'2016-11-18T14:29:39.8500000' AS DateTime2), 0.8, N'aia131@aubg.edu', N'Defaults', 60, N'4 minutes 12 seconds')
SET IDENTITY_INSERT [dbo].[Scores] OFF
SET IDENTITY_INSERT [dbo].[Settings] ON 

INSERT [dbo].[Settings] ([SettingsId], [Cost_a], [Cost_b], [Cost_c], [Description], [Revenue_a], [Revenue_b], [UserEmail]) VALUES (3, 1, -20, 204, N'Defaults', -0.5, 16, N'aia131@aubg.edu')
INSERT [dbo].[Settings] ([SettingsId], [Cost_a], [Cost_b], [Cost_c], [Description], [Revenue_a], [Revenue_b], [UserEmail]) VALUES (15, 1, -20, 216, N'Test', -0.5, 16, N'aia131@aubg.edu')
INSERT [dbo].[Settings] ([SettingsId], [Cost_a], [Cost_b], [Cost_c], [Description], [Revenue_a], [Revenue_b], [UserEmail]) VALUES (16, 1, -20, 204, N'Defaults', -0.5, 16, N'jgalletly@aubg.edu')
SET IDENTITY_INSERT [dbo].[Settings] OFF
INSERT [dbo].[Users] ([Email], [Name], [PasswordHash]) VALUES (N'aia131@aubg.edu', N'Aleks Angelov', N'KH8YjSFFu1XChqUIA4pNl2II0dgMvJay2suqFXyYHbc=')
INSERT [dbo].[Users] ([Email], [Name], [PasswordHash]) VALUES (N'jgalletly@aubg.edu', N'John Galletly', N'EK/EEi5uxSvg7SokofKRL1wM5MWEQgUfVX140cnfGRs=')
ALTER TABLE [dbo].[Scores] ADD  DEFAULT (N'') FOR [SettingsDescription]
GO
ALTER TABLE [dbo].[Scores] ADD  DEFAULT ((0.0000000000000000e+000)) FOR [TotalProfit]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (N'') FOR [PasswordHash]
GO
ALTER TABLE [dbo].[Scores]  WITH CHECK ADD  CONSTRAINT [FK_Scores_Users_UserEmail] FOREIGN KEY([UserEmail])
REFERENCES [dbo].[Users] ([Email])
GO
ALTER TABLE [dbo].[Scores] CHECK CONSTRAINT [FK_Scores_Users_UserEmail]
GO
ALTER TABLE [dbo].[Settings]  WITH CHECK ADD  CONSTRAINT [FK_Settings_Users_UserEmail] FOREIGN KEY([UserEmail])
REFERENCES [dbo].[Users] ([Email])
GO
ALTER TABLE [dbo].[Settings] CHECK CONSTRAINT [FK_Settings_Users_UserEmail]
GO
