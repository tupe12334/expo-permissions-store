import { describe, it, expect } from "vitest";
import { ALL_PERMISSIONS, DEFAULT_CONFIG } from "./types";

describe("types", () => {
  describe("ALL_PERMISSIONS", () => {
    it("should contain all 9 permission types", () => {
      expect(ALL_PERMISSIONS).toHaveLength(9);
    });

    it("should include camera permission", () => {
      expect(ALL_PERMISSIONS).toContain("camera");
    });

    it("should include microphone permission", () => {
      expect(ALL_PERMISSIONS).toContain("microphone");
    });

    it("should include mediaLibrary permission", () => {
      expect(ALL_PERMISSIONS).toContain("mediaLibrary");
    });

    it("should include locationForeground permission", () => {
      expect(ALL_PERMISSIONS).toContain("locationForeground");
    });

    it("should include locationBackground permission", () => {
      expect(ALL_PERMISSIONS).toContain("locationBackground");
    });

    it("should include notifications permission", () => {
      expect(ALL_PERMISSIONS).toContain("notifications");
    });

    it("should include contacts permission", () => {
      expect(ALL_PERMISSIONS).toContain("contacts");
    });

    it("should include calendar permission", () => {
      expect(ALL_PERMISSIONS).toContain("calendar");
    });

    it("should include tracking permission", () => {
      expect(ALL_PERMISSIONS).toContain("tracking");
    });

    it("should have specific order", () => {
      expect(ALL_PERMISSIONS).toEqual([
        "camera",
        "microphone",
        "mediaLibrary",
        "locationForeground",
        "locationBackground",
        "notifications",
        "contacts",
        "calendar",
        "tracking",
      ]);
    });
  });

  describe("DEFAULT_CONFIG", () => {
    it("should have all permissions by default", () => {
      expect(DEFAULT_CONFIG.permissions).toEqual(ALL_PERMISSIONS);
    });

    it("should have recheckOnForeground enabled by default", () => {
      expect(DEFAULT_CONFIG.recheckOnForeground).toBe(true);
    });

    it("should have autoCheckOnMount disabled by default", () => {
      expect(DEFAULT_CONFIG.autoCheckOnMount).toBe(false);
    });

    it("should have infinite cacheTime by default", () => {
      expect(DEFAULT_CONFIG.cacheTime).toBe(Infinity);
    });

    it("should be a complete Required<PermissionsConfig>", () => {
      expect(DEFAULT_CONFIG).toHaveProperty("permissions");
      expect(DEFAULT_CONFIG).toHaveProperty("recheckOnForeground");
      expect(DEFAULT_CONFIG).toHaveProperty("autoCheckOnMount");
      expect(DEFAULT_CONFIG).toHaveProperty("cacheTime");
    });
  });
});
