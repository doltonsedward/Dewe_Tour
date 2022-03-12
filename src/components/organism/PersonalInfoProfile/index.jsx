import { Gap, Group, Text, Input } from "../..";
import {
  IconUserCircle,
  IconEmail,
  IconPhone,
  IconLocation,
} from "../../../assets";
import { profileCoverButton } from "../../../utils";

// mui compnent
import { Button, Tooltip } from "@mui/material";

const PersonalInfoProfile = ({ getter, handler: { handleChange } }) => {
  const { form, profile, isEditable, preview } = getter;
  const muiBlockButton = {
    ...profileCoverButton,
    opacity: ".6",
    cursor: "no-drop",
  };

  return (
    <Group variant="space-between-only" className="personal-info__profile">
      {isEditable ? (
        <>
          <Group className="list-info__profile">
            <Text variant="bold" fontSize={36}>
              Personal info
            </Text>
            <Gap height={53} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconUserCircle} alt="the user info" />
              </Group>
              <Group>
                <Input
                  variant="basic"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                />
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Fullname
                </Text>
              </Group>
            </Group>
            <Gap height={28} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconEmail} alt="email user info" />
              </Group>
              <Group>
                <Input
                  variant="basic"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Email
                </Text>
              </Group>
            </Group>
            <Gap height={28} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconPhone} alt="phone user info" />
              </Group>
              <Group>
                <Input
                  variant="basic"
                  name="phone"
                  value={form.phone ?? "-"}
                  onChange={handleChange}
                />
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Mobile Phone
                </Text>
              </Group>
            </Group>
            <Gap height={28} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconLocation} alt="location user info" />
              </Group>
              <Group>
                <Input
                  variant="basic"
                  name="address"
                  value={form.address ?? "-"}
                  onChange={handleChange}
                />
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Address
                </Text>
              </Group>
            </Group>
          </Group>
          <Group>
            <div id="preview-thumbnail" className="preview-thumbnail__profile">
              {preview ? (
                <img
                  className="profile-img"
                  src={preview}
                  alt="this is profile of user face"
                />
              ) : (
                <img
                  className="profile-img"
                  src={profile?.avatar}
                  alt="this is profile of user face"
                />
              )}
            </div>
            <Gap height={10} />
            <div className="wrapper-input-file__profile">
              <Button variant="contained" sx={profileCoverButton}>
                <Input
                  className="input-file__profile"
                  name="avatar"
                  type="file"
                  style={{ width: "280px" }}
                  id="inputFileProfile"
                  onChange={handleChange}
                />
                Change Photo Profile
              </Button>
            </div>
          </Group>
        </>
      ) : (
        <>
          <Group className="list-info__profile">
            <Text variant="bold" fontSize={36}>
              Personal info
            </Text>
            <Gap height={53} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconUserCircle} alt="the user info" />
              </Group>
              <Group>
                <Text variant="bold" fontSize={14} lineHeight="20px">
                  {profile?.fullName}
                </Text>
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Fullname
                </Text>
              </Group>
            </Group>
            <Gap height={28} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconEmail} alt="email user info" />
              </Group>
              <Group>
                <Text variant="bold" fontSize={14} lineHeight="20px">
                  {profile?.email}
                </Text>
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Email
                </Text>
              </Group>
            </Group>
            <Gap height={28} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconPhone} alt="phone user info" />
              </Group>
              <Group>
                <Text variant="bold" fontSize={14} lineHeight="20px">
                  {!profile?.phone ? "-" : profile?.phone}
                </Text>
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Mobile Phone
                </Text>
              </Group>
            </Group>
            <Gap height={28} />
            <Group variant="flex">
              <Group className="list-icon-info__profile">
                <img src={IconLocation} alt="location user info" />
              </Group>
              <Group>
                <Text variant="bold" fontSize={14} lineHeight="20px">
                  {!profile?.address ? "-" : profile?.address}
                </Text>
                <Gap height={4} />
                <Text
                  variant="p"
                  fontSize={12}
                  lineHeight="16px"
                  className="color-gray-medium"
                >
                  Address
                </Text>
              </Group>
            </Group>
          </Group>
          <Group>
            <div id="preview-thumbnail" className="preview-thumbnail__profile">
              {preview ? (
                <img
                  className="profile-img"
                  src={preview}
                  alt="this is profile of user face"
                />
              ) : (
                <img
                  className="profile-img"
                  src={profile?.avatar}
                  alt="this is profile of user face"
                />
              )}
            </div>
            <Gap height={10} />
            <div className="wrapper-input-file__profile">
              <Tooltip
                title="You can't change anything without first clicking the EDIT button"
                followCursor
              >
                <Button variant="contained" sx={muiBlockButton}>
                  Change Photo Profile
                </Button>
              </Tooltip>
            </div>
          </Group>
        </>
      )}
    </Group>
  );
};

export default PersonalInfoProfile;
